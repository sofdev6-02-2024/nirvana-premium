// lib/session-token-accessor.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { decrypt } from "./encryption";

export async function getAccessToken(): Promise<string | null> {
    const session = await getServerSession(authOptions);

    if (session?.access_token) {
        try {
            const accessTokenDecrypted = decrypt(session.access_token);
            return accessTokenDecrypted;
        } catch (error) {
            console.error('Error decrypting access token:', error);
            return null;
        }
    }
    return null;
}

export async function getIdToken(): Promise<string | null> {
    const session = await getServerSession(authOptions);

    if (session?.id_token) {
        try {
            const idTokenDecrypted = decrypt(session.id_token);
            return idTokenDecrypted;
        } catch (error) {
            console.error('Error decrypting ID token:', error);
            return null;
        }
    }
    return null;
}

export async function getTokens(): Promise<{ accessToken: string | null; idToken: string | null }> {
    const [accessToken, idToken] = await Promise.all([
        getAccessToken(),
        getIdToken()
    ]);

    return {
        accessToken,
        idToken
    };
}