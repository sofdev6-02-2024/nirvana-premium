import { apiRequest } from "@/lib/api";
import { Recruiter, PaginatedResponse } from "../lib/constant";

export async function readCompany(
  page: number = 1,
  pageSize: number = 10,
): Promise<Recruiter[]> {
  try {
    const response = await apiRequest<PaginatedResponse<Recruiter>>(
      `/api/users-jobs/recruiters?page=${page}&pageSize=${pageSize}`,
      "GET",
    );
    return response.items || [];
  } catch (error) {
    console.error("Error fetching recruiters:", error);
    return [];
  }
}

export async function getRecruiterById(
  id: string,
): Promise<Recruiter | undefined> {
  try {
    return await apiRequest<Recruiter>(
      `/api/recruiters/${id}`,
      "GET",
      undefined,
    );
  } catch (error) {
    console.error(`Error fetching recruiter with id ${id}:`, error);
    return undefined;
  }
}

export async function getAllRecruiters(
  page: number = 1,
  pageSize: number = 10,
): Promise<Recruiter[]> {
  try {
    return await readCompany(page, pageSize);
  } catch (error) {
    console.error("Error in getAllRecruiters:", error);
    return [];
  }
}
