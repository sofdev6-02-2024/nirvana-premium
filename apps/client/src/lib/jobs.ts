import jobsData from "../data/jobs.json";
import { Job } from "./types";

export function getAllJobs(): Job[] {
  return jobsData as Job[];
}

export function getJobBySlug(slug: string): Job | undefined {
  return getAllJobs().find((job) => job.slug === slug);
}
