import { apiRequest } from "@/lib/api";
import { Recruiter } from "./constant";

export async function readCompany(
  page: number = 1,
  pageSize: number = 10,
): Promise<Recruiter[]> {
  const data = await apiRequest(
    `/api/users-jobs/recruiters=${page}&pageSize=${pageSize}`,
    "GET",
  );
  return data.jobs as Recruiter[];
}
export async function getRecruiterById(
  id: string,
  token: string,
): Promise<Recruiter | undefined> {
  return await apiRequest(`/api/recruiters/${id}`, "GET", undefined, token);
}

// export async function getAllRecruiters(
//   page: number = 1,
//   pageSize: number = 10,
// ): Promise<Recruiter[]> {
//   const recruiter: Recruiter[] = await readCompany(page, pageSize);
//   return recruiter;
// }

async function getAllRecruiters(): Promise<Recruiter[]> {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const res = await fetch("/recruiters.json");

      if (!res.ok) {
        throw new Error(`Failed to fetch recruiters data: ${res.statusText}`);
      }

      const recruiters: Recruiter[] = await res.json();
      return recruiters;
    } catch (error) {
      retries++;
      console.error(`Error fetching recruiters: ${error.message}`);
      // Implement exponential backoff here, e.g., using a delay based on retries
    }
  }

  throw new Error("Failed to fetch recruiters after multiple retries");
}
