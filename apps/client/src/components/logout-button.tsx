// components/LogoutMenuItem.tsx
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

async function handleLogout() {
  try {
    const response = await fetch('/api/auth/logout', { method: 'GET' });
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (data.logoutUrl) {
      console.log('Redirecting to Keycloak logout:', data.logoutUrl);
      window.location.href = data.logoutUrl;

      await signOut({
        callbackUrl: '/',
        redirect: false,
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
    await signOut({ callbackUrl: '/' });
  }
}

export function LogoutMenuItem() {
  return (
    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </DropdownMenuItem>
  );
}
