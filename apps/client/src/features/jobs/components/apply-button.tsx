'use client';

import { Button } from '@/components/ui/button';
import { useUserStore } from '@/features/users/store/user-store';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { JobService } from '../lib/job-service';

interface ApplyJobButtonProps {
  jobId: string;
}

export function ApplyJobButton({ jobId }: ApplyJobButtonProps) {
  const { user } = useUserStore();
  const { getToken } = useAuth();
  const router = useRouter();
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = async () => {
    if (!user?.developerId) {
      toast.error('You must be signed in as a developer to apply');
      return;
    }

    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available');

      await JobService.applyToJob(jobId, user.developerId, token);
      setIsApplied(true);
      toast.success('Application submitted successfully!');
      router.refresh();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('status: 409') &&
        error.message.includes('DeveloperAlreadyApplied')
      ) {
        setIsApplied(true);
        toast.error('You have already applied to this job');
      } else {
        toast.error('Failed to submit application');
      }
    }
  };

  return (
    <Button size="lg" className="w-full sm:w-auto" onClick={handleApply} disabled={isApplied}>
      {isApplied ? 'You already applied to this job' : 'Apply now'}
    </Button>
  );
}
