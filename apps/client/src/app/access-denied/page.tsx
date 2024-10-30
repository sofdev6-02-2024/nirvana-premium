import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldX } from 'lucide-react';

export default function AccessDenied() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      <div className="text-center">
        <ShieldX className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Access Denied
        </h1>
        <p className="mt-4 text-base text-gray-500">
          You dont have permission to access this page.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/jobs">View Jobs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}