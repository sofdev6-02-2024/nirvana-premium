'use server';

import { DeveloperService } from '../lib/api';
import { DeveloperFormValues } from '../lib/validations';

export async function createDeveloper(
  userId: string,
  token: string,
  formData: DeveloperFormValues,
): Promise<{ success: boolean; error?: string }> {
  try {
    await DeveloperService.createDeveloper(
      {
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
      },
      token,
    );

    return { success: true };
  } catch (error) {
    console.error('Error in createDeveloper:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create developer profile',
    };
  }
}
