import { jobCommandSchema } from "@/features/jobs/lib/validation";
import { nanoid } from "nanoid";
import { toSlug } from "@/lib/utils";
import { apiRequest } from "@/lib/api";

export async function createJobPosting(formData: FormData, accessToken: string) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    type,
    companyName,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;
  const companyLogoUrl = "company-logo-placeholder.png";

  const newJob = {
    slug,
    title: title.trim(),
    type,
    companyName: companyName.trim(),
    companyLogoUrl,
    locationType,
    location,
    applicationEmail: applicationEmail?.trim(),
    applicationUrl: applicationUrl?.trim(),
    description: description?.trim(),
    salary: parseInt(salary),
    approved: true
  };

  try {
    const response = await apiRequest("/api/users-jobs/jobs", "POST", newJob, accessToken);
    return response;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
}