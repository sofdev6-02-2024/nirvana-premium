import fs from "fs/promises";
import path from "path";
import { Job } from "./types";

const jsonPath = path.join(process.cwd(), "src", "data", "jobs.json");

async function readJobsFromFile() {
  const jsonData = await fs.readFile(jsonPath, "utf-8");
  return JSON.parse(jsonData);
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  const jobs = await readJobsFromFile();
  return jobs.find((job: Job) => job.slug === slug);
}

export async function getAllJobs(): Promise<Job[]> {
  const jobs = await readJobsFromFile();
  return jobs.filter((job: Job) => job.approved);
}
