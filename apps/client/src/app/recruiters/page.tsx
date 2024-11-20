import { RecruiterListItem } from '@/features/recruiters/components/recruiter-item';
import { getAllRecruiters } from '@/features/recruiters/lib/recruiter-service';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Recruiters',
};

export default async function RecruitersPage() {
  const recruiters = await getAllRecruiters();

  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Our Top Recruiters</h1>
        <p className="text-lg text-muted-foreground">
          Discover top companies looking for talented developers.
        </p>
      </div>
      <section className="space-y-6">
        <div className="space-y-4">
          {recruiters.map((recruiter) => (
            <Link key={recruiter.id} href={`/recruiters/${recruiter.id}`} className="block">
              <RecruiterListItem recruiter={recruiter} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
