/* eslint-disable @next/next/no-img-element */
'use client';

import { uploadImage } from '@/actions/upload';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { UploadStatus } from '@/types/upload';
import { Upload, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface FileUploadProps<T extends FieldValues> {
  field?: Partial<Omit<ControllerRenderProps<T, Path<T>>, 'ref'>> & {
    value?: string;
    onChange?: (url: string) => void;
  };
  onUploadError?: (error: string) => void;
  className?: string;
  value?: string;
  onChange?: (url: string) => void;
}

export function FileUpload<T extends FieldValues>({
  field,
  onUploadError,
  className,
  value: externalValue,
  onChange: externalOnChange,
}: FileUploadProps<T>) {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ progress: 0 });

  const value = field?.value || externalValue || '';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChange = field?.onChange || externalOnChange || (() => {});

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const error = fileRejections[0].errors[0].message;
        setUploadStatus({ progress: 0, error });
        onUploadError?.(error);
        return;
      }

      const file = acceptedFiles[0];
      if (!file) return;

      try {
        setUploadStatus({ progress: 20 });
        const formData = new FormData();
        formData.append('file', file);

        setUploadStatus({ progress: 40 });
        const result = await uploadImage(formData);

        if (!result.success || !result.data) {
          throw new Error(result.error || 'Upload failed');
        }

        setUploadStatus({ progress: 100, url: result.data.secure_url });
        onChange(result.data.secure_url);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';
        setUploadStatus({ progress: 0, error: errorMessage });
        onUploadError?.(errorMessage);
      }
    },
    [onChange, onUploadError],
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);

  const clearUpload = (): void => {
    setUploadStatus({ progress: 0 });
    onChange('');
  };

  return (
    <Card className={`relative ${className}`}>
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg cursor-pointer
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
          ${uploadStatus.url || value ? 'hidden' : 'block'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <Upload className="w-12 h-12 text-gray-400" />
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isDragActive ? 'Drop the file here' : 'Drag & drop an image, or click to select'}
            </p>
            <p className="mt-1 text-xs text-gray-500">JPG, PNG or WebP (max. 5MB)</p>
          </div>
        </div>
      </div>

      {uploadStatus.progress > 0 && !uploadStatus.url && !value && (
        <div className="p-4">
          <Progress value={uploadStatus.progress} className="w-full" />
        </div>
      )}

      {(uploadStatus.url || value) && (
        <div className="relative p-4">
          <button
            type="button"
            onClick={clearUpload}
            className="absolute top-6 right-6 p-1 bg-white rounded-full shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
          <img
            src={uploadStatus.url || value}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      {uploadStatus.error && <div className="p-4 text-red-500 text-sm">{uploadStatus.error}</div>}
    </Card>
  );
}
