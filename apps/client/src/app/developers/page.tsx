import LoadingScreen from '@/components/loading/loading-screen';
import DeveloperList from '@/features/developer/components/developer-list';
import { getDevelopers } from '@/features/developer/lib/developer-service';
import { Suspense } from 'react';

interface DevelopersPageProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function DevelopersPage({ searchParams = {} }: DevelopersPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = 10;

  const developersData = await getDevelopers(page, pageSize);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Find Developers</h1>
      <Suspense fallback={<LoadingScreen />}>
        <DeveloperList initialData={developersData} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
