import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { Roles } from '@/types/globals';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { aboutSchema } from '../../lib/validations';

interface AboutEditorProps {
  content: { text: string };
  role: Roles;
  onChange: (content: { text: string }) => void;
}

export default function AboutEditor({ content, role, onChange }: AboutEditorProps) {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      text: content.text || '',
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      onChange({ text: value.text || '' });
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  useEffect(() => {
    if (content.text !== watch('text')) {
      setValue('text', content.text || '');
    }
  }, [content.text, setValue, watch]);

  return (
    <div className="space-y-4">
      <Label>{role === 'Developer' ? 'About Me' : 'About Company'}</Label>
      <Textarea
        {...register('text')}
        className="min-h-[200px] resize-none"
        placeholder={
          role === 'Developer'
            ? "Write about yourself, your experience, and what you're looking for..."
            : "Share your company's story, mission, and what makes you unique..."
        }
      />
      {errors.text && <p className="text-sm text-destructive">{errors.text.message}</p>}
    </div>
  );
}
