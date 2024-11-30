export {};

export type Roles = 'Developer' | 'Recruiter' | 'developer' | 'recruiter';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      onboardingComplete?: boolean;
    };
  }
  interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
  }
}
