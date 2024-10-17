import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-cente">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold drop-shadow-md">Landing page</h1>
        <p className="text-lg"> A portal for developers looking for a job</p>
        <div>
          <LoginButton>
            <Button>
              Sign In
            </Button>
          </LoginButton>

        </div>
      </div>
    </main>
  );
}
