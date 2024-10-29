import { apiRequest } from "@/lib/api";
import { Job } from "@/features/jobs/lib/constants";

export async function readJobs(page: number = 1, pageSize: number = 10): Promise<Job[]> {
  const data = await apiRequest(`/api/users-jobs/jobs?page=${page}&pageSize=${pageSize}`, "GET");

  return data.jobs as Job[];
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  return await apiRequest(`/api/users-jobs/jobs/${slug}`, "GET");
}

export async function getAllJobs(page: number = 1, pageSize: number = 10): Promise<Job[]> {
  const jobs: Job[] = await readJobs(page, pageSize);

  return jobs.filter((job) => job.approved);
}