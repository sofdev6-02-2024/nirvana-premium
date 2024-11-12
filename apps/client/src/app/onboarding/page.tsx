"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/text-area";
import { useRegistrationStore } from "@/stores/use-registration-store";

export default function OnboardingPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { registrationData } = useRegistrationStore();

  const isDeveloper = user?.unsafeMetadata.role === "developer";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      await user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          ...data,
          onboardingComplete: true,
        },
      });

      console.log("Onboarding data ready for backend:", {
        userId: user?.id,
        ...data,
        role: user?.unsafeMetadata.role,
        onboardingComplete: true,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            {isDeveloper
              ? "Tell us about your skills and experience"
              : "Tell us about your company"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {isDeveloper ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Frontend Developer"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="e.g. React, TypeScript, Node.js"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">About You</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about yourself..."
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Enter your company name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    placeholder="e.g. Technology, Finance"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyDescription">
                    Company Description
                  </Label>
                  <Textarea
                    id="companyDescription"
                    name="companyDescription"
                    placeholder="Tell us about your company..."
                    required
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto" disabled={loading}>
              {loading ? "Saving..." : "Complete Profile"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
