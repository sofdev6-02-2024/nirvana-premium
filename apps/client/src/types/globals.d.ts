export {};

export type Roles = "developer" | "recruiter" | "admin";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      onboardingComplete?: boolean;
    };
  }
}
// 6zT6D5wD+gT1