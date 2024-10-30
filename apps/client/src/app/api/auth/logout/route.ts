import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getIdToken } from "@/features/auth/lib/session-token-accessor";

export async function GET(): Promise<Response> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("No active session", { status: 401 });
    }

    const idToken = await getIdToken();
    if (!idToken) {
      return new Response("No ID token found", { status: 401 });
    }

    const endSessionUrl = process.env.KEYCLOAK_ISSUER + "/protocol/openid-connect/logout";
    const nextAuthUrl = process.env.NEXTAUTH_URL;

    if (!endSessionUrl || !nextAuthUrl) {
      console.error("Environment variables KEYCLOAK_ISSUER or NEXTAUTH_URL are not set.");
      return new Response("Server configuration error", { status: 500 });
    }

    const logoutUrl = new URL(endSessionUrl);
    logoutUrl.searchParams.append("id_token_hint=", idToken);
    logoutUrl.searchParams.append("post_logout_redirect_uri=", nextAuthUrl);
    
    return new Response(JSON.stringify({ logoutUrl: logoutUrl.toString() }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}