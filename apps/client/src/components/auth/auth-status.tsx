"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface User {
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

interface Session {
  user: User;
  error?: string;
}

async function keycloakSessionLogOut(): Promise<void> {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

export default function AuthStatus() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status !== "loading" &&
      session &&
      (session as Session)?.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);

  if (status === "loading") {
    return <div className="text-sm">Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm">
          <span className="text-gray-500">Logged in as</span>{" "}
          <span className="text-orange-500">{session.user.email}</span>
        </span>
        <Button
          variant="outline"
          onClick={() => {
            keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
          }}
        >
          Log out
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" onClick={() => signIn("keycloak")}>
      Log in
    </Button>
  );
}