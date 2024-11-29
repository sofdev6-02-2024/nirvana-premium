'use client';

import { Button } from '@/components/ui/button';
import { useUserStore } from '@/features/users/store/user-store';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { JobService } from '../lib/job-service';

interface ApplyJobButtonProps {
  jobId: string;
}

export function ApplyJobButton({ jobId }: ApplyJobButtonProps) {
  const { user } = useUserStore();
  const { getToken } = useAuth();
  const router = useRouter();

  const handleApply = async () => {
    if (!user?.developerId) {
      toast.error('You must be signed in as a developer to apply');
      return;
    }

    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available');

      await JobService.applyToJob(jobId, user.developerId, token);
      toast.success('Application submitted successfully!');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit application');
    }
  };

  return (
    <Button size="lg" className="w-full sm:w-auto" onClick={handleApply}>
      <span className="flex items-center justify-center gap-2">
        Apply now
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </span>
    </Button>
  );
}
