import { FileUpload } from '@/components/forms/file-upload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import type { ProjectContent } from '@/features/profile/lib/types';
import { Roles } from '@/types/globals';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, X } from 'lucide-react';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { projectSchema } from '../../lib/validations';

interface ProjectsEditorProps {
  content: { projects: ProjectContent[] };
  role: Roles;
  onChange: (content: { projects: ProjectContent[] }) => void;
}

export function ProjectsEditor({ content, role, onChange }: ProjectsEditorProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        projects: z.array(projectSchema).min(1, 'Add at least one project'),
      }),
    ),
    defaultValues: {
      projects: content.projects || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const formValues = watch();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name?.startsWith('projects.') || type === 'change') {
        onChange({ projects: value.projects });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">
              {role === 'developer' ? 'Project' : 'Success Story'} {index + 1}
            </h3>
            <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                {...register(`projects.${index}.title`)}
                placeholder={`${role === 'developer' ? 'Project' : 'Story'} title`}
              />
              {errors.projects?.[index]?.title && (
                <p className="text-sm text-destructive mt-1">
                  {errors.projects[index]?.title?.message}
                </p>
              )}
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                {...register(`projects.${index}.description`)}
                placeholder={`${role === 'developer' ? 'Project' : 'Story'} description`}
              />
              {errors.projects?.[index]?.description && (
                <p className="text-sm text-destructive mt-1">
                  {errors.projects[index]?.description?.message}
                </p>
              )}
            </div>

            {role === 'developer' && (
              <div>
                <Label>Technologies (comma-separated)</Label>
                <Input
                  {...register(`projects.${index}.technologies`)}
                  placeholder="React, TypeScript, Node.js..."
                />
              </div>
            )}

            <div>
              <Label>Link</Label>
              <Input {...register(`projects.${index}.link`)} placeholder="https://" />
              {errors.projects?.[index]?.link && (
                <p className="text-sm text-destructive mt-1">
                  {errors.projects[index]?.link?.message}
                </p>
              )}
            </div>

            <div>
              <Label>Image</Label>
              <FileUpload
                field={{
                  value: formValues.projects?.[index]?.imageUrl || '',
                  onChange: (url: string) => {
                    const updatedProjects = [...formValues.projects];
                    if (updatedProjects[index]) {
                      updatedProjects[index].imageUrl = url;
                      onChange({ projects: updatedProjects });
                    }
                  },
                }}
              />
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => {
          append({
            title: '',
            description: '',
            technologies: role === 'developer' ? [] : undefined,
            link: '',
            imageUrl: '',
          });
        }}
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add {role === 'developer' ? 'Project' : 'Success Story'}
      </Button>
    </div>
  );
}
