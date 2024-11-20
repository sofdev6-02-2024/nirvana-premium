import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const companyFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters.' })
    .max(30, { message: 'Company name must be less than 30 characters.' }),

  location: z.string().min(3, { message: 'Location is required' }),

  description: z
    .string()
    .min(50, { message: 'Description must be at least 50 characters' })
    .max(200, { message: 'Description should be less than 200 characters' }),

  profilePicture: z
    .any()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: 'Max image size is 5MB.',
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Only .jpg, .jpeg, .png, and .webp formats are supported.',
    }),
});

export const developerFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),

  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  specialization: z.enum(['Frontend', 'Backend', 'DevOps', 'Architect'] as const),
  yearsOfExperience: z.number().min(0).max(20),
  location: z.string().min(3, { message: 'Location is required' }),

  spokenLanguages: z.array(z.string()).min(1, 'Select at least one language'),

  modality: z.enum(['Remote', 'OnSite', 'Hybrid'] as const),
  expectedSalary: z.number().min(0, 'Salary must be a positive number'),
  portfolioUrl: z.string().url('Please enter a valid URL'),
  profilePicture: z
    .any()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: 'Max image size is 5MB.',
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Only .jpg, .jpeg, .png, and .webp formats are supported.',
    }),
});

export type DeveloperFormValues = z.infer<typeof developerFormSchema>;
