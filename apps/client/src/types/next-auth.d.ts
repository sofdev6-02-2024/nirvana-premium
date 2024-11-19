import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    access_token?: string;
    id_token?: string;
    roles?: string[];
    error?: string;
    user: {
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    decoded?: {
      realm_access: {
        roles: string[];
      };
    };
    accessToken?: string;
    id_token?: string;
    expires_at?: number;
    refresh_token?: string;
    userProp?: unknown;
    error?: string;
  }
}
