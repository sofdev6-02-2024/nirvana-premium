import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getRecruiterById } from "@/features/recruiters/lib/recruiter-service";
import { JobListSkeleton } from "@/features/jobs/components/job-list-skeleton";
import { Metadata, ResolvingMetadata } from "next";
import { RecruiterDetailHeader } from "@/features/recruiters/components/recruiter-header";
import { RecruiterJobList } from "@/features/recruiters/components/recruiter-job.-list";

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const recruiter = await getRecruiterById(params.id);
    if (!recruiter) return { title: "Recruiter Not Found" };

    return {
      title: `${recruiter.name} | Developer Jobs`,
      description: recruiter.description,
    };
  } catch {
    return {
      title: "Recruiter Not Found",
      description: "The requested recruiter could not be found.",
    };
  }
}

export default async function RecruiterDetailPage({ params }: Props) {
  try {
    const recruiter = await getRecruiterById(params.id);
    if (!recruiter) notFound();

    return (
      <main className="mx-auto my-10 max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
        <RecruiterDetailHeader recruiter={recruiter} />

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Open Positions</h2>
          <Suspense fallback={<JobListSkeleton />}>
            <RecruiterJobList recruiterId={recruiter.id} />
          </Suspense>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error rendering recruiter page:", error);
    notFound();
  }
}
