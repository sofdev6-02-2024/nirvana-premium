"use server";

import { createJobSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { toSlug } from "@/lib/utils";
import path from "path";

export async function createJobPosting(formData: FormData) {
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
    companyLogoUrl, // Placeholder
    locationType,
    location,
    applicationEmail: applicationEmail?.trim(),
    applicationUrl: applicationUrl?.trim(),
    description: description?.trim(),
    salary: parseInt(salary),
  };

  try {
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    if (!response.ok) {
      throw new Error("Failed to create job");
    }
  } catch (error) {
    console.error("Error creating job:", error);
  }
  redirect("/job-submitted");
}
