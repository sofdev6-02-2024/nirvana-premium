'use server';

import { z } from 'zod';
import { CompanyService } from '../lib/api';
import { CompanyFormValues } from '../lib/validations';

interface CreateCompanyResponse {
  success: boolean;
  error?: string;
}

export async function createCompany(
  formData: CompanyFormValues,
  userId: string,
  token: string,
): Promise<CreateCompanyResponse> {
  try {
    await CompanyService.createCompany(
      {
        userId,
        name: formData.name,
        location: formData.location,
        profilePicture: formData.profilePicture || null,
      },
      token,
    );

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Invalid form data provided',
      };
    }

    console.error('Error in createCompany action:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create company',
    };
  }
}
