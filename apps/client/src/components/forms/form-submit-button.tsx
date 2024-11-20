'use client';

import LoadingButton from '@/components/forms/loading-button';
import { useFormStatus } from 'react-dom';

export default function FormSubmitButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return <LoadingButton {...props} type="submit" loading={pending} />;
}
