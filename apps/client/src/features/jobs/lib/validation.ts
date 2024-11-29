import * as z from 'zod';

export const jobFormSchema = z.object({
  title: z.string().min(10, 'Job title must be at least 10 characters.'),
  specializationId: z.string().uuid('You must select one specialization'),
  salaryPerHour: z.number().min(1, 'Salary must be greater than 0'),
  schedule: z.enum(['FullTime', 'PartTime'] as const),
  modality: z.enum(['Remote', 'OnSite', 'Hybrid'] as const),
  location: z.string().min(3, 'Location is required'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  skills: z.array(z.string().uuid()).min(1, 'Select at least one skill'),
  spokenLanguages: z.array(z.string().uuid()).min(1, 'Select at least one language'),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
