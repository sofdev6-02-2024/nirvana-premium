'use server ';

import { JobFormData } from '../lib/constants';
import { JobFormValues } from '../lib/validation';

interface CreateJobResponse {
  success: boolean;
  error?: string;
  data?: JobFormData;
}

export async function createJobPosting(
  userId: string,
  formData: JobFormValues,
): Promise<CreateJobResponse> {
  try {
    const jobData = {
      userId,
      title: formData.title,
      salaryPerHour: formData.salaryPerHour,
      schedule: formData.schedule,
      modality: formData.modality,
      location: formData.location,
      description: formData.description,
      skills: formData.skills,
      languages: formData.spokenLanguages,
      specializationId: formData.specializationId,
    };

    console.log('Job Data ready for the APi', jobData);
    return {
      success: true,
      data: jobData,
    };
  } catch (error) {
    console.error('Error while creating a job post', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create job post',
    };
  }
}
