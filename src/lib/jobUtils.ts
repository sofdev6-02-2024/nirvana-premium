import fs from "fs/promises";
import path from "path";

const jsonPath = path.join(process.cwd(), "src", "data", "jobs.json");

async function readJobsFromFile() {
  const jsonData = await fs.readFile(jsonPath, "utf-8");
  return JSON.parse(jsonData);
}

export async function getJobBySlug(slug: string) {
  const jobs = await readJobsFromFile();
  return jobs.find((job: any) => job.slug === slug);
}

export async function getAllJobs() {
  const jobs = await readJobsFromFile();
  return jobs.filter((job: any) => job.approved);
}
