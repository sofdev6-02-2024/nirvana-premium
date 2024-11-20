'use client';

import LoadingButton from '@/components/forms/loading-button';
import LocationInput from '@/components/forms/location-input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { draftToMarkdown } from 'markdown-draft-js';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { mockLanguages, mockSkills } from '../lib/mock';
import { jobFormSchema, type JobFormValues } from '../lib/validation';
import RichTextEditor from './rich-text-editor';

export function JobPostForm() {
  const router = useRouter();
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      specialization: 'Frontend',
      salaryPerHour: 0,
      schedule: 'FullTime',
      modality: 'Remote',
      location: '',
      description: '',
      skills: [],
      languages: [],
      attachments: [],
    },
  });

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: JobFormValues) {
    try {
      console.log('Form submission started', values);

      const transformedValues = {
        ...values,
        skills: values.skills.map(Number),
        languages: values.languages.map(Number),
      };

      console.log('Transformed values:', transformedValues);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Job posted successfully');
      console.log('Toast should have appeared');

      try {
        await router.push('/jobs');
      } catch (routerError) {
        console.error('Router push failed:', routerError);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to post job. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          console.log('Form submitted');
          console.log(e);
          handleSubmit(onSubmit)(e);
        }}
        className="space-y-8"
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior Frontend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Frontend">Frontend</SelectItem>
                    <SelectItem value="Backend">Backend</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="Architect">Architect</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="salaryPerHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hourly Rate (USD)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <LocationInput onLocationSelected={field.onChange} ref={field.ref} />
              </FormControl>
              {watch('location') && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setValue('location', '', { shouldValidate: true });
                    }}
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <span className="text-sm">{watch('location')}</span>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={control}
            name="schedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schedule</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FullTime">Full Time</SelectItem>
                    <SelectItem value="PartTime">Part Time</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="modality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modality</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select modality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="OnSite">On Site</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label onClick={() => setFocus('description')}>Description</Label>
              <FormControl>
                <RichTextEditor
                  onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Skills</FormLabel>
              <div className="grid grid-cols-3 gap-4">
                {mockSkills.map((skill) => (
                  <FormItem key={skill.id} className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value.includes(skill.id)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, skill.id]
                            : field.value.filter((value) => value !== skill.id);
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{skill.name}</FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Languages</FormLabel>
              <div className="grid grid-cols-3 gap-4">
                {mockLanguages.map((language) => (
                  <FormItem key={language.id} className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value.includes(language.id)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, language.id]
                            : field.value.filter((value) => value !== language.id);
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{language.name}</FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="attachments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    field.onChange(files);
                  }}
                />
              </FormControl>
              <FormDescription>Upload any relevant documents (max 5MB per file)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Job Posting'}
        </LoadingButton>
      </form>
    </Form>
  );
}
