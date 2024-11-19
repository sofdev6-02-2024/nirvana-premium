'use client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRegistrationStore } from '@/stores/use-registration-store';
import { SignUp, useSignUp } from '@clerk/nextjs';
import React, { useState } from 'react';

const SignUpPage = () => {
  const [selectedRole, setSelectedRole] = useState<'developer' | 'recruiter'>('developer');
  const [error, setError] = useState<string | null>(null);
  const [showRoleDialog, setShowRoleDialog] = useState(true);
  const { isLoaded, signUp } = useSignUp();

  const { setRegistrationData } = useRegistrationStore();

  const handleRoleSelect = (value: 'developer' | 'recruiter') => {
    setSelectedRole(value);
    setShowRoleDialog(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('emailAddress') as string;
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string;

      const result = await signUp.create({
        emailAddress: email,
        username,
        password,
        firstName,
        lastName,
        unsafeMetadata: {
          role: selectedRole,
          onboardingComplete: false,
        },
      });

      setRegistrationData({
        id: result.createdUserId!,
        username,
        firstName: firstName || null,
        lastName: lastName || null,
        role: selectedRole,
        email,
      });

      console.log('Registration data ready for backend:', {
        id: result.createdUserId,
        username,
        firstName,
        lastName,
        role: selectedRole,
        email,
      });
    } catch (err) {
      console.error('Error during signup:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Join our platform to find opportunities or great talent</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose your role</DialogTitle>
                <DialogDescription>Select how you want to use our platform</DialogDescription>
              </DialogHeader>
              <RadioGroup
                defaultValue="developer"
                value={selectedRole}
                onValueChange={(value) => handleRoleSelect(value as 'developer' | 'recruiter')}
                className="flex flex-col space-y-2"
              >
                <div
                  className="flex cursor-pointer items-center space-x-2 rounded-lg border p-4 hover:bg-gray-100 dark:hover:bg-muted"
                  onClick={() => handleRoleSelect('developer')}
                >
                  <RadioGroupItem value="developer" id="developer" />
                  <Label htmlFor="developer" className="flex w-full cursor-pointer flex-col">
                    <span className="font-semibold">Developer</span>
                    <span className="text-sm text-gray-500">
                      Find your first job opportunity in tech
                    </span>
                  </Label>
                </div>
                <div
                  className="flex cursor-pointer items-center space-x-2 rounded-lg border p-4 hover:bg-gray-100 dark:hover:bg-muted"
                  onClick={() => handleRoleSelect('recruiter')}
                >
                  <RadioGroupItem value="recruiter" id="recruiter" />
                  <Label htmlFor="recruiter" className="flex w-full cursor-pointer flex-col">
                    <span className="font-semibold">Recruiter</span>
                    <span className="text-sm text-gray-500">
                      Find great talent for your company
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </DialogContent>
          </Dialog>

          <form onSubmit={handleSubmit} className="mt-4 bg-secondary">
            <SignUp
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              fallbackRedirectUrl="/onboarding"
              unsafeMetadata={{
                role: selectedRole,
                onboardingComplete: false,
              }}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
