'use client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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
import { Roles } from '@/types/globals';
import { SignUp } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

const SignUpPage = () => {
  const [selectedRole, setSelectedRole] = useState<Roles | null>(null);
  const [error] = useState<string | null>(null);
  const [showRoleDialog, setShowRoleDialog] = useState(false);

  useEffect(() => {
    const hasRole = localStorage.getItem('selectedRole') as Roles | null;
    if (!hasRole) {
      setShowRoleDialog(true);
    } else {
      setSelectedRole(hasRole);
    }
  }, []);

  const handleRoleSelect = (value: Roles) => {
    setSelectedRole(value);
    localStorage.setItem('selectedRole', value);
    setShowRoleDialog(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl md:text-2xl">Select your role</CardTitle>
            <CardDescription>
              Join our platform to find opportunities or great talent
            </CardDescription>
            {selectedRole && (
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Selected role: <span className="font-medium capitalize">{selectedRole}</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRoleDialog(true)}
                  className="text-xs hover:bg-secondary"
                >
                  Change role
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Choose your role</DialogTitle>
                  <DialogDescription>Select how you want to use our platform</DialogDescription>
                </DialogHeader>
                <RadioGroup
                  defaultValue={selectedRole || undefined}
                  onValueChange={(value) => handleRoleSelect(value as Roles)}
                  className="flex flex-col space-y-3"
                >
                  <div
                    className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    onClick={() => handleRoleSelect('Developer')}
                  >
                    <RadioGroupItem value="developer" id="developer" className="h-5 w-5" />
                    <Label
                      htmlFor="developer"
                      className="flex w-full cursor-pointer flex-col gap-1"
                    >
                      <span className="font-semibold">Developer</span>
                      <span className="text-sm text-muted-foreground">
                        Find your first job opportunity in tech
                      </span>
                    </Label>
                  </div>
                  <div
                    className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    onClick={() => handleRoleSelect('Recruiter')}
                  >
                    <RadioGroupItem value="recruiter" id="recruiter" className="h-5 w-5" />
                    <Label
                      htmlFor="recruiter"
                      className="flex w-full cursor-pointer flex-col gap-1"
                    >
                      <span className="font-semibold">Recruiter</span>
                      <span className="text-sm text-muted-foreground">
                        Find great talent for your company
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </DialogContent>
            </Dialog>

            {selectedRole && (
              <SignUp
                path="/sign-up"
                routing="path"
                signInUrl="/sign-in"
                forceRedirectUrl="/onboarding"
                unsafeMetadata={{
                  role: selectedRole,
                  onboardingComplete: false,
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
