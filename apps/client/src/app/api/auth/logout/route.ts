import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.id_token) {
      return NextResponse.json({ error: "No active session" }, { status: 401 });
    }

    const endSessionUrl = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
    const nextAuthUrl = process.env.NEXTAUTH_URL;

    if (!endSessionUrl || !nextAuthUrl) {
      return NextResponse.json(
        { error: "Missing configuration" },
        { status: 500 },
      );
    }

    const logoutUrl = new URL(endSessionUrl);
    logoutUrl.searchParams.append("id_token_hint", session.id_token);
    logoutUrl.searchParams.append("post_logout_redirect_uri", nextAuthUrl);
    logoutUrl.searchParams.append("client_id", process.env.KEYCLOAK_ID!);

    return NextResponse.json({ logoutUrl: logoutUrl.toString() });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
