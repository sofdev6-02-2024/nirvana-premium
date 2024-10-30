import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";
import { encrypt } from "@/features/auth/lib/encryption";
import { JWT } from "next-auth/jwt";

const clientId = process.env.KEYCLOAK_ID;
const clientSecret = process.env.KEYCLOAK_SECRET;
const issuer = process.env.KEYCLOAK_ISSUER;
const refreshTokenUrl = process.env.REFRESH_TOKEN_URL;

if (!clientId || !clientSecret || !issuer || !refreshTokenUrl) {
    throw new Error("Keycloak environment variables are not set correctly.");
}

const KEYCLOAK_CONFIG = {
    clientId: clientId as string,
    clientSecret: clientSecret as string,
    issuer: issuer as string,
    refreshTokenUrl: refreshTokenUrl as string,
} as const;

interface RefreshTokenResponse {
    access_token: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        if (!token.refresh_token) {
            throw new Error("No refresh token available");
        }

        const url = new URL(KEYCLOAK_CONFIG.refreshTokenUrl);

        const params = new URLSearchParams({
            client_id: KEYCLOAK_CONFIG.clientId,
            client_secret: KEYCLOAK_CONFIG.clientSecret,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
        });

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
            method: "POST",
        });

        if (!response.ok) {
            throw new Error(`Failed to refresh token: ${response.statusText}`);
        }

        const refreshToken: RefreshTokenResponse = await response.json();
        
        return {
            ...token,
            accessToken: refreshToken.access_token,
            decoded: jwtDecode(refreshToken.access_token),
            id_token: refreshToken.id_token,
            expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
            refresh_token: refreshToken.refresh_token,
            error: undefined,
        };
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: KEYCLOAK_CONFIG.clientId,
            clientSecret: KEYCLOAK_CONFIG.clientSecret,
            issuer: KEYCLOAK_CONFIG.issuer,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            const nowTimeStamp = Math.floor(Date.now() / 1000);

            if (account) {
                token.decoded = account.access_token ? jwtDecode(account.access_token) : undefined;
                token.accessToken = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                return token;
            }

            if (token.expires_at && nowTimeStamp < token.expires_at) {
                return token;
            }

            console.log("Token expired, attempting refresh");
            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            if (token.accessToken) {
                session.access_token = encrypt(token.accessToken);
            }
            if (token.id_token) {
                session.id_token = encrypt(token.id_token);
            }
            if (token.decoded?.realm_access?.roles) {
                session.roles = token.decoded.realm_access.roles;
            }
            if (token.error) {
                session.error = token.error;
            }

            return session;
        }
    },
    events: {
        async signOut({ token }) {
            if (token.id_token) {
                try {
                    const endSessionUrl = new URL(`${KEYCLOAK_CONFIG.issuer}/protocol/openid-connect/logout`);
                    endSessionUrl.searchParams.set('id_token_hint', token.id_token);
                    endSessionUrl.searchParams.set('post_logout_redirect_uri', process.env.NEXTAUTH_URL || '');
                    
                    await fetch(endSessionUrl.toString(), { method: 'GET' });
                } catch (error) {
                    console.error('Error during Keycloak logout:', error);
                }
            }
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };