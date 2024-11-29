import { z } from 'zod';


export const companyFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters.' })
    .max(30, { message: 'Company name must be less than 30 characters.' }),

  location: z.string().min(3, { message: 'Location is required' }),

  profilePicture: z
    .union([z.string().url('Invalid image URL'), z.custom<File>()])
    .optional()
    .nullable(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

export const developerFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  modality: z.enum(['Remote', 'Hybrid', 'On Site'] as const),
  yearsOfExperience: z
    .number()
    .min(0, 'Years of experience cannot be negative')
    .max(20, 'Years of experience cannot exceed 20'),
  salaryExpected: z
    .number()
    .min(0, 'Salary must be a positive number')
    .max(1000, 'Hourly rate cannot exceed $1000'),
  location: z.string().min(3, { message: 'Location is required' }),

  specializationId: z.string().uuid('Invalid specialization selected'),
  skills: z.array(z.string().uuid()).min(1, 'Select at least one skill'),
  spokenLanguages: z.array(z.string().uuid()).min(1, 'Select at least one language'),

  portfolioUrl: z.string().url('Please enter a valid URL').optional().nullable(),
  profilePicture: z
    .union([z.string().url('Invalid image URL'), z.custom<File>()])
    .optional()
    .nullable(),
});

export type DeveloperFormValues = z.infer<typeof developerFormSchema>;
