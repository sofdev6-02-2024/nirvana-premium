"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);

  if (status === "loading") {
    return <div className="text-sm">Loading...</div>;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm">
          <span className="text-gray-500">Logged in as</span>{" "}
          <span className="text-orange-500">{session.user.email}</span>
        </span>
        <Button
          variant="outline"
          onClick={() => signOut({ 
            callbackUrl: "/",
          })}
        >
          Log out
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant="outline" 
      onClick={() => signIn("keycloak")}
    >
      Log in
    </Button>
  );
}