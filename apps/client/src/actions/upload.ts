'use server';

import { uploadToCloudinary } from '@/lib/cloudinary';
import { CloudinaryUploadResponse } from '@/types/upload';

interface UploadResponse {
  success: boolean;
  data?: CloudinaryUploadResponse;
  error?: string;
}

export async function uploadImage(formData: FormData): Promise<UploadResponse> {
  try {
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      throw new Error('No file provided');
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'] as const;
    if (!validTypes.includes(file.type as (typeof validTypes)[number])) {
      throw new Error('Invalid file type. Please upload JPG, PNG, or WebP');
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size exceeds 5MB limit');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadToCloudinary(buffer);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}
