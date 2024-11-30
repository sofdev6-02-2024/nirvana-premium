'use client';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { UserService } from '../lib/user-service';
import { useUserStore } from '../store/user-store';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { getToken, userId } = useAuth();
  const { setUser, setIdentityId, setToken, user } = useUserStore();
  const pathname = usePathname();

  useEffect(() => {
    const loadUser = async () => {
      if (!userId || user || pathname.startsWith('/onboarding')) {
        return;
      }

      try {
        const token = await getToken();
        if (!token) return;

        setIdentityId(userId);
        setToken(token);

        const userData = await UserService.getUserByIdentityId(userId, token);
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };

    loadUser();
  }, [userId, getToken, setUser, setIdentityId, setToken, pathname, user]);

  return <>{children}</>;
}
