import { Job } from "./types";

const apiPath = "http://localhost:9500";


async function readJobs(page: number = 1, pageSize: number = 10): Promise<Job[]> {
  const res = await fetch(`${apiPath}/api/users-jobs/jobs?page=${page}&pageSize=${pageSize}`);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data: Job[] = await res.json();
  return data;
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  const res = await fetch(`${apiPath}/api/users-jobs/jobs/${slug}`);
  const data: Job = await res.json();
  return data;
}

export async function getAllJobs(page: number = 1, pageSize: number = 10): Promise<Job[]> {
  const jobs: Job[] = await readJobs(page, pageSize);

  return jobs.filter((job: Job) => job.approved);
}

