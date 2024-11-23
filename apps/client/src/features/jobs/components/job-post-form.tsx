'use client';

import LoadingButton from '@/components/forms/loading-button';
import LocationInput from '@/components/forms/location-input';
import LoadingScreen from '@/components/loading/loading-screen';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
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
import { getLanguages, getSkills, getSpecializations } from '@/lib/developer-api';
import { Language, Skill, Specialization } from '@/types/dev';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { draftToMarkdown } from 'markdown-draft-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createJobPosting } from '../actions/job-actions';
import { jobFormSchema, type JobFormValues } from '../lib/validation';
import RichTextEditor from './rich-text-editor';

export function JobPostForm() {
  const { user } = useUser();
  const router = useRouter();
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      specializationId: '',
      salaryPerHour: 0,
      schedule: 'Full Time',
      modality: 'Remote',
      location: '',
      description: '',
      skills: [],
      spokenLanguages: [],
    },
  });

  const [skills, setSkills] = useState<Skill[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadFormData() {
      try {
        const [skillsData, specializationsData, languagesData] = await Promise.all([
          getSkills(),
          getSpecializations(),
          getLanguages(),
        ]);

        setSkills(skillsData);
        setSpecializations(specializationsData);
        setLanguages(languagesData);
      } catch (error) {
        console.error('Error loading form data:', error);
        toast.error('Failed to load form data. Please refresh the page.');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadFormData();
    return () => {
      mounted = false;
    };
  }, []);

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: JobFormValues) => {
    if (!user) {
      toast.error('You must be signed in to create a job');
      return;
    }
    try {
      const result = await createJobPosting(user.id, data);
      if (!result.success) {
        throw new Error(result.error || 'Failed to create job');
      }

      toast.success('Job  created successfully!');
      console.log('Submission result:', result);
      toast.success('Job created successfully!');
      return <LoadingScreen fullScreen text="Redirecting to home page..." />;
      setTimeout(() => {
        router.push('/home');
      }, 1200);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create job');
    }
  };

  if (isLoading) {
    return <LoadingScreen fullScreen text="Loading developer data" />;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Job Title <span className="text-destructive">*</span>
              </FormLabel>
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
            name="specializationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Specialization
                  <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec.id} value={spec.id}>
                        {spec.name}
                      </SelectItem>
                    ))}
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
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
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
                    <SelectItem value="On Site">On Site</SelectItem>
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
              <FormLabel>
                Required Skills <span className="text-destructive">*</span>
              </FormLabel>
              <div className="grid grid-cols-3 gap-4">
                {skills.map((skill) => (
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
          name="spokenLanguages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Required Languages <span className="text-destructive">*</span>
              </FormLabel>
              <div className="grid grid-cols-3 gap-4">
                {languages.map((language) => (
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

        <LoadingButton type="submit" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Job Posting'}
        </LoadingButton>
      </form>
    </Form>
  );
}
