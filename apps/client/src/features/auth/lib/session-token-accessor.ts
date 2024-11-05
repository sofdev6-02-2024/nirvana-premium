import { getSession } from "next-auth/react";

export async function getAccessToken(): Promise<string | null> {
  const session = await getSession();
  return session?.access_token ?? null;
}

export async function getIdToken(): Promise<string | null> {
  const session = await getSession();
  return session?.id_token ?? null;
}

export async function getTokens(): Promise<{
  accessToken: string | null;
  idToken: string | null;
}> {
  const session = await getSession();
  return {
    accessToken: session?.access_token ?? null,
    idToken: session?.id_token ?? null,
  };
}
