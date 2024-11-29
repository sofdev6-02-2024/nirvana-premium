export {};

export type Roles = 'Developer' | 'Recruiter';

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
