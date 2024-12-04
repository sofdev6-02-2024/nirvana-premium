import { Button } from '@/components/ui/button';
import H1 from '@/components/ui/h1';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
      <H1>Job Created</H1>
      <p>
        Your job posting has been submitted and is pending for approval. Do you want faster
        approvals? Pay us.
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link href="/home">Return to Home</Link>
        </Button>
      </div>
    </main>
  );
}
