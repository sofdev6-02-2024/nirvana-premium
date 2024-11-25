import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { Roles } from '@/types/globals';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { aboutSchema } from '../../lib/validations';

type AboutFormData = z.infer<typeof aboutSchema>;

interface AboutEditorProps {
  content: { text: string };
  role: Roles;
  onChange: (content: { text: string }) => void;
}

export function AboutEditor({ content, role }: AboutEditorProps) {
  const {
    register,
    formState: { errors },
  } = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      text: content.text || '',
    },
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{role === 'developer' ? 'About Me' : 'About Company'}</Label>
        <Textarea
          {...register('text')}
          placeholder={
            role === 'developer'
              ? 'Write about yourself, your background, and what drives you...'
              : 'Write about your company, its background, and what makes it unique...'
          }
          className="min-h-[200px]"
        />
        {errors.text && <p className="text-sm text-destructive">{errors.text.message}</p>}
      </div>
    </div>
  );
}
