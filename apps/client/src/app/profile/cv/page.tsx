'use client';

import { ProfileBuilder } from '@/features/home/components/builder';
import { apiRequest } from '@/lib/api';
import { useUser } from '@clerk/nextjs';

export default function CVPage() {
  const { user } = useUser();

  const handleSave = async (content: string) => {
    if (!user?.id) return;

    return apiRequest({
      endpoint: `/users-jobs/developers/${user.id}/cv`,
      method: 'PUT',
      body: { description: content },
    });
  };

  return <ProfileBuilder type="developer" onSave={handleSave} initialContent="" />;
}
