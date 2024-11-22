import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const ROUTES = {
  PUBLIC: createRouteMatcher([
    '/',
    '/about(.*)',
    '/contact(.*)',
    '/privacy(.*)',
    '/terms(.*)',
    '/jobs/(.*)',
    '/recruiter/(.*)',
  ]),
  PROTECTED: createRouteMatcher(['/jobs/(.*)', '/dashboard(.*)', '/home(.*)']),
  RECRUITER: createRouteMatcher(['/jobs/new', '/jobs/manage(.*)', '/company/profile(.*)']),
  DEVELOPER: createRouteMatcher(['/profile/developer(.*)', '/applications(.*)']),
  AUTH: createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']),
} as const;

const REDIRECTS = {
  DEFAULT: '/home',
  ACCESS_DENIED: '/access-denied',
  UNAUTHORIZED: '/sign-in',
} as const;

const createRedirectResponse = (url: string, req: Request): NextResponse => {
  return NextResponse.redirect(new URL(url, req.url));
};

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const userRole = sessionClaims?.metadata?.role;

  if (ROUTES.PUBLIC(req) || ROUTES.AUTH(req)) {
    return NextResponse.next();
  }

  if (ROUTES.RECRUITER(req) && userRole !== 'recruiter') {
    return createRedirectResponse(REDIRECTS.ACCESS_DENIED, req);
  }

  if (ROUTES.DEVELOPER(req) && userRole !== 'developer') {
    return createRedirectResponse(REDIRECTS.ACCESS_DENIED, req);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
