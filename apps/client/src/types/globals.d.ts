export {};

export type Roles = 'developer' | 'recruiter';

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
