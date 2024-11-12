"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { companyFormSchema, CompanyFormValues } from "../lib/validations";
import { Company } from "../lib/types";
import { Textarea } from "@/components/ui/text-area";
import LocationInput from "@/components/forms/location-input";
import { X } from "lucide-react";
import LoadingButton from "@/components/forms/loading-button";

export default function CompanyOnboardingForm() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      profilePicture: "",
    },
  });

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: CompanyFormValues) => {
    if (!user) return;

    try {
      const companyData: Company = {
        ...data,
        isVerified: false,
        isActive: true,
        userId: user.id,
      };

      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          onboardingComplete: true,
        },
      });

      console.log("Company data ready for backend:", companyData);

      toast.success("Company profile created successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving company data:", error);
      toast.error("Failed to create company profile. Please try again.");
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>
            Complete your company profile to get started
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be your company's display name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <LocationInput
                        onLocationSelected={field.onChange}
                        ref={field.ref}
                      />
                    </FormControl>
                    {watch("location") && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setValue("location", "", { shouldValidate: true });
                          }}
                        >
                          <X className="h-5 w-5" />
                        </button>
                        <span className="text-sm">{watch("location")}</span>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your company..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Briefly describe your company's mission and values
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload a profile image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        placeholder="A file"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload your profile picture
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Job Posting"}
              </LoadingButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
