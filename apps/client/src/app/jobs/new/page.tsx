import { Metadata } from "next";
import NewJobForm from "@/features/jobs/components/new-job-form";
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Post a new job",
};

export default async function Page() {

  return (
    <div className="min-h-[calc(100vh-8rem)] px-4">
      <NewJobForm />
    </div>
  );
}