import { CloudinaryUploadResponse } from '@/types/upload';
import { v2 as cloudinary } from 'cloudinary';

if (
  !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error('Missing Cloudinary environment variables');
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadOptions {
  folder?: string;
  transformation?: unknown[];
}

export const uploadToCloudinary = async (
  file: Buffer,
  options?: CloudinaryUploadOptions,
): Promise<CloudinaryUploadResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options?.folder || 'uploads',
        transformation: options?.transformation,
      },
      (error, result) => {
        if (error || !result) reject(error || new Error('Upload failed'));
        else resolve(result as CloudinaryUploadResponse);
      },
    );
    uploadStream.end(file);
  });
};
