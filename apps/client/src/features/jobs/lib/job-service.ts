import { Job } from "@/features/jobs/lib/constants";
import { apiRequest, API_PATH } from "@/lib/api";
import { notFound } from "next/navigation";

interface JobsResponse {
  items: Job[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export async function readJobs(
  searchParams?: { [key: string]: string | undefined },
  page: number = 1,
  pageSize: number = 10,
): Promise<{ jobs: Job[]; hasNextPage: boolean; page: number }> {
  try {
    console.log("📝 Environment check:", {
      API_PATH,
      NODE_ENV: process.env.NODE_ENV,
      searchParams,
    });

    const response = await apiRequest<JobsResponse>({
      endpoint: "/users-jobs/jobs",
      method: "GET",
      revalidate: 3600,
      params: {
        page,
        pageSize,
        ...searchParams,
      },
    });

    console.log(
      `📊 Fetched ${response.items.length} jobs out of ${response.totalCount} total`,
    );

    return {
      jobs: response.items,
      hasNextPage: response.hasNextPage,
      page: response.page,
    };
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    return { jobs: [], hasNextPage: false, page };
  }
}

export async function getJobById(id: string): Promise<Job> {
  try {
    console.log(`🔍 Fetching job with ID: ${id}`);

    const job = await apiRequest<Job>({
      endpoint: `/users-jobs/jobs/${id}`,
      method: "GET",
      revalidate: 3600,
    });

    console.log(`✅ Successfully fetched job:`, {
      id: job.id,
      title: job.title,
    });
    return job;
  } catch (error) {
    console.error(`❌ Error fetching job ${id}:`, error);
    notFound();
  }
}

function filterJobs(
  jobs: Job[],
  params: { [key: string]: string | undefined },
): Job[] {
  console.log("🔍 Filtering jobs with params:", params);

  return jobs.filter((job) => {
    if (
      params.search &&
      !job.title.toLowerCase().includes(params.search.toLowerCase())
    ) {
      return false;
    }
    if (params.modality && job.modality !== params.modality) {
      return false;
    }
    if (params.schedule && job.schedule !== params.schedule) {
      return false;
    }
    if (params.minSalary && job.salaryPerHour < Number(params.minSalary)) {
      return false;
    }
    return true;
  });
}
