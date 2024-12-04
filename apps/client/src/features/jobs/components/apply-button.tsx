'use client';

import { Button } from '@/components/ui/button';
import { useUserStore } from '@/features/users/store/user-store';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { JobService } from '../lib/job-service';

interface ApplyJobButtonProps {
  jobId: string;
}

export function ApplyJobButton({ jobId }: ApplyJobButtonProps) {
  const { user } = useUserStore();
  const { getToken } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'applied' | 'not-applied'>('loading');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function checkApplicationStatus() {
      if (!user?.developerId) {
        setStatus('not-applied');
        setIsInitialized(true);
        return;
      }

      try {
        const token = await getToken();
        if (!token) throw new Error('Authentication token not available');

        const { apply } = await JobService.checkApplicationStatus(jobId, user.developerId, token);
        setStatus(apply ? 'applied' : 'not-applied');
      } catch (error) {
        console.error('Failed to check application status:', error);
        toast.error('Failed to check application status');
        setStatus('not-applied');
      } finally {
        setIsInitialized(true);
      }
    }

    checkApplicationStatus();
  }, [jobId, user?.developerId, getToken]);

  const handleApply = async () => {
    if (!user?.developerId) {
      toast.error('You must be signed in as a developer to apply');
      return;
    }

    setStatus('loading');

    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available');

      await JobService.applyToJob(jobId, user.developerId, token);
      setStatus('applied');
      toast.success('Application submitted successfully!');
      router.refresh();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('status: 409') &&
        error.message.includes('DeveloperAlreadyApplied')
      ) {
        setStatus('applied');
        toast.error('You have already applied to this job');
      } else {
        setStatus('not-applied');
        toast.error('Failed to submit application');
      }
    }
  };

  if (!isInitialized) {
    return null;
  }

  if (status === 'applied') {
    return (
      <Button size="lg" className="w-full sm:w-auto" variant="secondary" disabled>
        Already applied
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className="w-full sm:w-auto"
      onClick={handleApply}
      disabled={status === 'loading'}
    >
      {status === 'loading' ? 'Applying...' : 'Apply now'}
    </Button>
  );
}
