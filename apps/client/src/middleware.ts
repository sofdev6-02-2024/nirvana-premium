import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/onboarding(.*)", "/jobs/(.*)"]);

const isRecruiterRoute = createRouteMatcher(["/jobs/new"]);

export default clerkMiddleware(async (auth, req) => {
  if (isRecruiterRoute(req)) {
    try {
      await auth.protect();
      if ((await auth()).sessionClaims?.metadata?.role !== "recruiter") {
        const url = new URL("/access-denied", req.url);
        return NextResponse.redirect(url);
      }
    } catch {
      const url = new URL("/access-denied", req.url);
      return NextResponse.redirect(url);
    }
  }

  if (isProtectedRoute(req)) {
    try {
      await auth.protect();
    } catch {
      const url = new URL("/access-denied", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
