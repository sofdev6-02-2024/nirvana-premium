import { useSession } from 'next-auth/react';

type SessionWithRoles = {
  roles?: string[];
};

export function useRoleCheck() {
  const { data: session } = useSession() as { data: SessionWithRoles | null };

  const hasRole = (roleToCheck: string | string[]): boolean => {
    if (!session?.roles || !Array.isArray(session.roles)) return false;

    const roles = Array.isArray(roleToCheck) ? roleToCheck : [roleToCheck];
    return roles.some((role) => session.roles!.includes(role));
  };

  const isCompany = () => hasRole('company');
  const isDeveloper = () => hasRole('developer');

  return {
    hasRole,
    isCompany,
    isDeveloper,
  };
}
