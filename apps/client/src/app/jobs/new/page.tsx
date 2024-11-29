import { JobPostFormWrapper } from '@/features/jobs/components/job-post-form-wrapper';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Post New Job',
  description: 'Create a new job posting',
};

export default async function NewJobPage() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const userRole = sessionClaims?.metadata?.role as 'Developer' | 'Recruiter';

  if (userRole !== 'Recruiter') {
    redirect('/home');
  }

  return (
    <main className="mx-auto my-10 max-w-3xl space-y-8 px-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <p className="text-muted-foreground">Create a new job posting for your company</p>
      </div>
      <JobPostFormWrapper />
    </main>
  );
}
