'use server';

import { CreateDeveloperData } from '../lib/types';
import { DeveloperFormValues } from '../lib/validations';

interface CreateDeveloperResponse {
  success: boolean;
  error?: string;
  data?: CreateDeveloperData;
}

export async function createDeveloper(
  userId: string,
  formData: DeveloperFormValues,
): Promise<CreateDeveloperResponse> {
  try {
    const developerData = {
      userId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      modality: formData.modality,
      yearsOfExperience: Number(formData.yearsOfExperience),
      salaryExpected: Number(formData.salaryExpected),
      location: formData.location,
      profilePicture: formData.profilePicture || null,
      portfolioUrl: formData.portfolioUrl || null,
      specializationId: formData.specializationId,
      skills: formData.skills,
      spokenLanguages: formData.spokenLanguages,
    };

    console.log('Developer data prepared for API:', developerData);

    return {
      success: true,
      data: developerData,
    };
  } catch (error) {
    console.error('Error in createDeveloper:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create developer profile',
    };
  }
}
