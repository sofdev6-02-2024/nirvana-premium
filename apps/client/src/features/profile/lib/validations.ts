import { z } from 'zod';

export const layoutSchema = z.object({
  columns: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  order: z.number().min(0),
});

export const sectionSchema = z.object({
  id: z.string(),
  type: z.string(),
  content: z.string(),
  layout: layoutSchema,
});

export const profileDataSchema = z.object({
  sections: z.array(sectionSchema),
});

export const aboutSchema = z.object({
  text: z
    .string()
    .min(1, 'About text is required')
    .max(2000, 'About text must be less than 2000 characters'),
});

export const experienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  period: z.string().min(1, 'Period is required'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  imageUrl: z.string().url().optional(),
  link: z.string().url().optional(),
  technologies: z.array(z.string()).optional(),
});

export const contactSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  socialLinks: z
    .array(
      z.object({
        platform: z.string().min(1, 'Platform name is required'),
        url: z.string().url('Invalid URL'),
      }),
    )
    .optional(),
});

export const missionSchema = z.object({
  mission: z
    .string()
    .min(1, 'Mission statement is required')
    .max(1000, 'Mission statement must be less than 1000 characters'),
  values: z
    .array(
      z.object({
        title: z.string().min(1, 'Value title is required'),
        description: z.string().min(1, 'Value description is required'),
      }),
    )
    .min(1, 'At least one value is required'),
  culture: z.string().min(1, 'Company culture description is required'),
});

export const benefitsSchema = z.object({
  benefits: z
    .array(
      z.object({
        title: z.string().min(1, 'Benefit title is required'),
        description: z.string().min(1, 'Benefit description is required'),
        icon: z.string().optional(),
      }),
    )
    .min(1, 'At least one benefit is required'),
});

export const skillsSchema = z.object({
  selectedSkills: z
    .array(z.string())
    .min(1, 'Select at least one skill')
    .max(20, 'You can select up to 20 skills'), // You can adjust this limit
});
