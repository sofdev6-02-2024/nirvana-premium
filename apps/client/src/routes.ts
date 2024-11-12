/**
 * An array of routes that are accesible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/jobs", "/recruiters", "/developers"];


export const protectedRoutes = ["/onboarding", "/jobs/*"]

export const justForRecruiter = ["/jobs/new"]