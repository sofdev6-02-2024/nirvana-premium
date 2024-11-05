import type { NextAuthConfig } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";

export const KEYCLOAK_CONFIG = {
  clientId: process.env.KEYCLOAK_ID || "public-client",
  clientSecret: process.env.KEYCLOAK_SECRET!,
  issuer:
    process.env.KEYCLOAK_ISSUER || "http://localhost:18080/realms/chamba-auth",
  refreshTokenUrl:
    process.env.REFRESH_TOKEN_URL ||
    "http://localhost:18080/realms/chamba-auth/protocol/openid-connect/token",
} as const;

Object.entries(KEYCLOAK_CONFIG).forEach(([key, value]) => {
  if (!value) throw new Error(`${key} environment variable is not set`);
});

interface RefreshTokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
}

async function refreshAccessToken(token: any) {
  try {
    if (!token.refresh_token) {
      throw new Error("No refresh token available");
    }

    const params = new URLSearchParams({
      client_id: KEYCLOAK_CONFIG.clientId,
      client_secret: KEYCLOAK_CONFIG.clientSecret,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    });

    const response = await fetch(KEYCLOAK_CONFIG.refreshTokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const refreshedTokens: RefreshTokenResponse = await response.json();

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      decoded: jwtDecode(refreshedTokens.access_token),
      id_token: refreshedTokens.id_token,
      expires_at: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
      refresh_token: refreshedTokens.refresh_token,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export default {
  providers: [
    Keycloak({
      clientId: KEYCLOAK_CONFIG.clientId,
      clientSecret: KEYCLOAK_CONFIG.clientSecret,
      issuer: KEYCLOAK_CONFIG.issuer,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const now = Math.floor(Date.now() / 1000);

      if (account) {
        return {
          ...token,
          decoded: account.access_token
            ? jwtDecode(account.access_token)
            : undefined,
          accessToken: account.access_token,
          id_token: account.id_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        };
      }

      if (token.expires_at && now < token.expires_at) {
        return token;
      }

      if (token.error === "RefreshAccessTokenError") {
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.error === "RefreshAccessTokenError") {
        return null;
      }

      return {
        ...session,
        access_token: token.accessToken,
        id_token: token.id_token,
        roles: token.decoded?.realm_access?.roles,
        error: token.error,
      };
    },
  },
} satisfies NextAuthConfig;
