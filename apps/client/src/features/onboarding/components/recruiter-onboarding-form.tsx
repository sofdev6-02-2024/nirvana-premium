'use client';

import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { FileUpload } from '@/components/forms/file-upload';
import LoadingButton from '@/components/forms/loading-button';
import LocationInput from '@/components/forms/location-input';
import LoadingScreen from '@/components/loading/loading-screen';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { useUserStore } from '@/features/users/store/user-store';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { createCompany } from '../actions/create-company-action';
import { companyFormSchema, CompanyFormValues } from '../lib/validations';

export default function CompanyOnboardingForm() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { user: backendUser, token } = useUserStore();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: '',
      location: '',
      profilePicture: '',
    },
  });

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  if (!isLoaded) {
    return <LoadingScreen fullScreen text="Loading your onboarding form..." />;
  }

  if (!user || !backendUser || !token) {
    router.push('/sign-in');
    return null;
  }

  const onSubmit = async (data: CompanyFormValues) => {
    try {
      const result = await createCompany(data, backendUser.id, token);

      if (!result.success) {
        throw new Error(result.error || 'Failed to create company profile');
      }

      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          onboardingComplete: true,
        },
      });

      toast.success('Company profile created successfully!');
      router.push('/home');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create company profile';

      console.error('Error saving company data:', error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>Complete your company profile to get started</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company Name <span className="text-destructive">*</span>{' '}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormDescription>This will be your company&aposs display name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Location <span className="text-destructive">*</span>
                    </FormLabel>
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

              <FormField
                control={control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Upload a profile image
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <FileUpload
                        field={field}
                        onUploadError={(error) => {
                          toast.error(error);
                        }}
                      />
                    </FormControl>
                    <FormDescription>Upload your profile picture</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <LoadingButton type="submit" loading={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Job Posting'}
              </LoadingButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
