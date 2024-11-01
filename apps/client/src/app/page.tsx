import JobListItem from "@/features/jobs/components/job-list-item";
import { RecruiterListItem } from "@/features/recruiters/components/recruiter-item";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold drop-shadow-md">Landing page</h1>
        <p className="text-lg">A portal for developers looking for a job</p>
      </div>
    </main>
  );
}
