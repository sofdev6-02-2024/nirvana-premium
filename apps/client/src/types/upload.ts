export type CloudinaryUploadResponse = {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
};

export type UploadStatus = {
  progress: number;
  error?: string;
  url?: string;
};
