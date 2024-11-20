// app/actions/auth.ts
'use server';

import { auth, signOut } from '@/auth';
import { KEYCLOAK_CONFIG } from '@/auth.config';

export async function handleLogout() {
  try {
    const session = await auth();

    if (session?.id_token) {
      const endSessionUrl = new URL(`${KEYCLOAK_CONFIG.issuer}/protocol/openid-connect/logout`);
      endSessionUrl.searchParams.set('id_token_hint', session.id_token);
      endSessionUrl.searchParams.set('post_logout_redirect_uri', process.env.NEXTAUTH_URL || '');
      endSessionUrl.searchParams.set('client_id', KEYCLOAK_CONFIG.clientId);

      const response = await fetch(endSessionUrl.toString(), {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Keycloak logout failed: ${response.statusText}`);
      }
    }

    await signOut();
  } catch (error) {
    console.error('Logout error:', error);
    await signOut();
  }
}
