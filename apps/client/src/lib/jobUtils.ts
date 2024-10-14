import { Job } from "./types";

const apiPath = "http://localhost:5001";


async function readJobs(): Promise<Job[]> {
  const res = await fetch(`${apiPath}/jobs`);
  const data: Job[] = await res.json();

  return data;
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  const jobs = await readJobs();

  return jobs.find((job: Job) => job.slug === slug);
}

export async function getAllJobs(): Promise<Job[]> {
  const jobs: Job[] = await readJobs();

  return jobs.filter((job: Job) => job.approved);
}
