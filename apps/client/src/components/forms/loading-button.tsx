// components/forms/loading-button.tsx
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ButtonProps } from "@/components/ui/button";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export default function LoadingButton({
  children,
  loading,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={disabled || loading} className="relative">
      {loading && <Loader2 className="absolute h-4 w-4 animate-spin" />}
      <span className={loading ? "opacity-0" : "opacity-100"}>{children}</span>
    </Button>
  );
}
