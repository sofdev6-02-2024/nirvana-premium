'use server';

import { z } from 'zod';
import { companyFormSchema } from '../lib/validations';

interface ActionResponse {
  success: boolean;
  error?: string;
  data?: unknown;
}

export async function createCompany(
  formData: z.infer<typeof companyFormSchema> & { userId: string },
): Promise<ActionResponse> {
  try {
    const validatedData = companyFormSchema.parse({
      name: formData.name,
      location: formData.location,
      profilePicture: formData.profilePicture,
    });

    const companyData = {
      userId: formData.userId,
      ...validatedData,
    };

    console.log('Company data ready for backend submission:', companyData);

    return {
      success: true,
      data: companyData,
    };
  } catch (error) {
    console.error('Error in createCompany action:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create company',
    };
  }
}
