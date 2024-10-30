import { z } from "zod";
import { modalities, schedules } from "./constants";

const requiredString = z.string().min(1, "This field is required");

const isoDateString = z.string().refine(
  (date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime()) && date === parsed.toISOString();
  },
  "Must be a valid ISO date string"
);

const salarySchema = z
  .number()
  .positive("Salary must be positive")
  .max(1000, "Salary per hour cannot exceed $1,000");

const locationSchema = z.object({
  location: z.string().max(200),
  modality: z.enum(modalities),
}).refine(
  (data) => {
    if (data.modality !== "Remote") {
      return data.location.length > 0;
    }
    return true;
  },
  {
    message: "Location is required for OnSite and Hybrid positions",
    path: ["location"],
  }
);

export const jobCommandSchema = z.object({
  title: requiredString.max(100, "Title cannot exceed 100 characters"),
  description: requiredString.max(5000, "Description cannot exceed 5000 characters"),
  salaryPerHour: salarySchema,
  dueDate: isoDateString,
  modality: z.enum(modalities, {
    errorMap: () => ({ message: "Invalid modality type" }),
  }),
  schedule: z.enum(schedules, {
    errorMap: () => ({ message: "Invalid schedule type" }),
  }),
  location: z.string().max(200, "Location cannot exceed 200 characters"),
  recruiterId: z.string().uuid("Invalid recruiter ID format"),
}).refine(
  (data) => {
    const dueDate = new Date(data.dueDate);
    const now = new Date();
    return dueDate > now;
  },
  {
    message: "Due date must be in the future",
    path: ["dueDate"],
  }
);

export type JobCommand = z.infer<typeof jobCommandSchema>;

