import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";
import { encrypt } from "@/lib/encryption";

const clientId = process.env.KEYCLOAK_ID as string | undefined;
const clientSecret = process.env.KEYCLOAK_SECRET as string | undefined;
const issuer = process.env.KEYCLOAK_ISSUER as string | undefined;

if (!clientId || !clientSecret || !issuer) {
    throw new Error("Keycloak environment variables are not set correctly.");
}


async function keycloakSessionLogOut() {
    try {
        await fetch(`/api/auth/logout`, { method: "GET"});
    } catch (err) {
        console.error(err);
    }
}

export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId,
            clientSecret,
            issuer,
        }),
    ],

    callbacks: {
        async jwt({token, account}) {
            const nowTimeStamp = Math.floor(Date.now() / 1000);
            if (account) {
                token.decoded = jwtDecode(account.access_token);
                token.accessToken = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                token.userProp = account.userProp;
                return token;   
            } else if(nowTimeStamp < token.expires_at) {
                return token;
            } else {
                console.log("Token is expired, try to refresh it");
                return token;
            }

        },
        async session({session, token}) {
            session.access_token = encrypt(token.access_token); // see utils/sessionTokenAccessor.js
            session.id_token = encrypt(token.id_token);  // see utils/sessionTokenAccessor.js
            session.roles = token.decoded.realm_access.roles;
            session.error = token.error;      
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
