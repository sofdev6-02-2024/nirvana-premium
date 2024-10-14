import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";

const jsonPath = path.join(process.cwd(), "src", "data", "jobs.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
    } = createJobSchema.parse(body);

    const slug = `${toSlug(title)}-${nanoid(10)}`;
    const companyLogoUrl = "company-logo-placeholder.png";
    const newJob = {
      id: Date.now(),
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
      createdAt: new Date().toISOString(),
      approved: true,
    };

    const jsonData = await fs.readFile(jsonPath, "utf8");
    const jobs = JSON.parse(jsonData);

    jobs.push(newJob);

    await fs.writeFile(jsonPath, JSON.stringify(jobs, null, 2));

    return NextResponse.json(
      { message: "Job created successfully", job: newJob },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 },
    );
  }
}
