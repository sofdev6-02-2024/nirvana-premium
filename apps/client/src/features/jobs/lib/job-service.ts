import { apiRequest } from "@/lib/api";
import { Job, PaginatedResponse } from "./constants";

export async function readJobs(
  page: number = 1,
  pageSize: number = 100,
): Promise<Job[]> {
  try {
    const response = await apiRequest<PaginatedResponse<Job>>(
      `/api/users-jobs/jobs?page=${page}&pageSize=${pageSize}`,
      "GET",
    );
    return response.items || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getJobById(id: string): Promise<Job | undefined> {
  try {
    return await apiRequest<Job>(`/api/users-jobs/jobs/${id}`, "GET");
  } catch (error) {
    console.error(`Error fetching job with id ${id}:`, error);
    return undefined;
  }
}
