import { apiRequest } from "@/lib/api";
import { Recruiter, PaginatedResponse } from "../lib/constant";
import { Job } from "@/features/jobs/lib/constants";

interface GetRecruitersOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  location?: string;
}

class RecruiterServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "RecruiterServiceError";
  }
}

export async function readCompany(
  page: number = 1,
  pageSize: number = 10,
): Promise<Recruiter[]> {
  try {
    const response = await apiRequest<PaginatedResponse<Recruiter>>({
      endpoint: "/users-jobs/recruiters",
      method: "GET",
      params: {
        page,
        pageSize,
      },
    });
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
    const allRecruiters = await getAllRecruiters();
    return allRecruiters.find((recruiter) => recruiter.id === id);
  } catch (error) {
    console.error(`Error fetching recruiter with id ${id}:`, error);
    return undefined;
  }
}

export async function getAllRecruiters(
  page: number = 1,
  pageSize: number = 100,
): Promise<Recruiter[]> {
  try {
    return await readCompany(page, pageSize);
  } catch (error) {
    console.error("Error in getAllRecruiters:", error);
    return [];
  }
}

export async function searchRecruiters({
  page = 1,
  pageSize = 10,
  search = "",
  location = "",
}: GetRecruitersOptions = {}): Promise<Recruiter[]> {
  try {
    const response = await apiRequest<PaginatedResponse<Recruiter>>({
      endpoint: "/users-jobs/recruiters",
      method: "GET",
      params: {
        page,
        pageSize,
        ...(search && { search }),
        ...(location && { location }),
      },
    });
    return response.items || [];
  } catch (error) {
    console.error("Error searching recruiters:", error);
    return [];
  }
}

export async function getJobsByRecruiter(
  recruiterId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<Job[]> {
  try {
    const response = await apiRequest<PaginatedResponse<Job>>({
      endpoint: `/users-jobs/jobs/recruiter/${recruiterId}`,
      method: "GET",
      params: {
        page,
        pageSize,
      },
    });
    return response.items || [];
  } catch (error) {
    console.error(`Error fetching jobs for recruiter ${recruiterId}:`, error);
    return [];
  }
}
