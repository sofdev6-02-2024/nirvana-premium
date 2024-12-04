import { RecruiterListItem } from '@/features/recruiters/components/recruiter-item';
import { getAllRecruiters } from '@/features/recruiters/lib/recruiter-service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recruiters',
};

export default async function RecruitersPage() {
  const recruiters = await getAllRecruiters();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/10">
      <main className="container py-8 lg:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Our Top Recruiters
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover top companies looking for talented developers.
          </p>
        </div>

        <section className="mx-auto mt-8 max-w-4xl lg:mt-12">
          <div className="grid gap-4 sm:gap-6">
            {recruiters.map((recruiter) => (
              <RecruiterListItem key={recruiter.id} recruiter={recruiter} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
