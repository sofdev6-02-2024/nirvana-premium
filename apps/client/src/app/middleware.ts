import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware'

const roleProtectedRoutes = [
  {
    path: '/jobs/new',
    allowedRoles: ['company'],
  },
  {
    path: '/company/dashboard',
    allowedRoles: ['company'],
  },
  {
    path: '/developer/profile',
    allowedRoles: ['developer'],
  },
]

const authProtectedRoutes = [
  '/jobs/',
]

export async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  const isJobDetail = request.nextUrl.pathname.match(/^\/jobs\/[^/]+$/)
  if (isJobDetail) {
    if (!token) {
      const callbackUrl = encodeURIComponent(request.nextUrl.pathname)
      return NextResponse.redirect(
        new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, request.url)
      )
    }
    return NextResponse.next()
  }

  const roleProtectedRoute = roleProtectedRoutes.find(route =>
    request.nextUrl.pathname.startsWith(route.path)
  )

  if (roleProtectedRoute) {
    if (!token) {
      const callbackUrl = encodeURIComponent(request.nextUrl.pathname)
      return NextResponse.redirect(
        new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, request.url)
      )
    }

    const userRoles = token.roles as string[] || []
    const hasRequiredRole = roleProtectedRoute.allowedRoles.some(role =>
      userRoles.includes(role)
    )

    if (!hasRequiredRole) {
      return NextResponse.redirect(new URL('/access-denied', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/jobs/new',
    '/company/dashboard',
    '/developer/profile',
    '/jobs/:slug*'
  ]
}