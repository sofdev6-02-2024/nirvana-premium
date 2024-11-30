import { Roles } from './types/globals';

const isValidRole = (role: string | undefined, expectedRole: Roles): boolean => {
  if (!role) return false;
  return role.toLowerCase() === expectedRole.toLowerCase();
};

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const ROUTES = {
  PUBLIC: createRouteMatcher(['/', '/developers(.*)', '/jobs(.*)', '/recruiters(.*)']),
  RECRUITER: createRouteMatcher(['/jobs/new(.*)', '/profile/about(.*)']),
  DEVELOPER: createRouteMatcher(['/profile/portfolio(.*)']),
  PROTECTED: createRouteMatcher(['/home(.*)']),
  AUTH: createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']),
  ONBOARDING: createRouteMatcher(['/onboarding(.*)']),
} as const;

const REDIRECTS = {
  DEFAULT: '/home',
  ACCESS_DENIED: '/access-denied',
  UNAUTHORIZED: '/sign-in',
  CREATE_USER: '/onboarding/create',
  ONBOARDING: '/onboarding',
} as const;

const createRedirectResponse = (url: string, req: Request): NextResponse => {
  return NextResponse.redirect(new URL(url, req.url));
};

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  const userRole = sessionClaims?.metadata?.role as string | undefined;

  console.log('Auth Check:', {
    url: req.url,
    userRole,
    userId,
    metadata: sessionClaims?.metadata,
  });

  if (ROUTES.PUBLIC(req)) {
    return NextResponse.next();
  }
  if (ROUTES.AUTH(req) && userId) {
    return createRedirectResponse(REDIRECTS.CREATE_USER, req);
  }

  if (!userId && !ROUTES.AUTH(req)) {
    return createRedirectResponse(REDIRECTS.UNAUTHORIZED, req);
  }

  if (ROUTES.ONBOARDING(req)) {
    if (!userId) {
      return createRedirectResponse(REDIRECTS.UNAUTHORIZED, req);
    }
    return NextResponse.next();
  }

  if (!ROUTES.ONBOARDING(req) && sessionClaims?.metadata?.onboardingComplete === false) {
    return createRedirectResponse(REDIRECTS.ONBOARDING, req);
  }

  const isRecruiterRoute = ROUTES.RECRUITER(req);
  const isDeveloperRoute = ROUTES.DEVELOPER(req);

  if (isRecruiterRoute && !isValidRole(userRole, 'Recruiter')) {
    console.log('Access denied - Recruiter route:', { userRole, url: req.url });
    return createRedirectResponse(REDIRECTS.ACCESS_DENIED, req);
  }

  if (isDeveloperRoute && !isValidRole(userRole, 'Developer')) {
    console.log('Access denied - Developer route:', { userRole, url: req.url });
    return createRedirectResponse(REDIRECTS.ACCESS_DENIED, req);
  }

  if (ROUTES.PROTECTED(req) && !isRecruiterRoute && !isDeveloperRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
