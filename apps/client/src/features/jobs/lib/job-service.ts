import { apiRequest } from "@/lib/api";
import { Job } from "@/features/jobs/lib/constants";

export async function readJobs(
  page: number = 1,
  pageSize: number = 10,
): Promise<Job[]> {
  const data = await apiRequest(
    `/api/users-jobs/jobs?page=${page}&pageSize=${pageSize}`,
    "GET",
  );
  return data.items as Job[];
}
export async function getJobById(
  id: string,
  token: string,
): Promise<Job | undefined> {
  return await apiRequest(
    `/api/users-jobs/jobs/${id}`,
    "GET",
    undefined,
    token,
  );
}
