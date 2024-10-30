import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
  size?: "sm" | "default" | "lg";
  fullScreen?: boolean;
}

const Loading = ({
                   text = "Loading...",
                   size = "default",
                   fullScreen = false
                 }: LoadingProps) => {
  const sizeMap = {
    sm: {
      wrapper: "h-6",
      icon: 16,
      text: "text-sm"
    },
    default: {
      wrapper: "h-8",
      icon: 24,
      text: "text-base"
    },
    lg: {
      wrapper: "h-12",
      icon: 32,
      text: "text-lg"
    }
  };

  const baseClasses = "flex items-center justify-center gap-3 text-muted-foreground";
  const wrapperClasses = fullScreen
    ? `${baseClasses} fixed inset-0 bg-background/80 backdrop-blur-sm`
    : `${baseClasses} ${sizeMap[size].wrapper}`;

  return (
    <div className={wrapperClasses}>
      <Loader2
        className="animate-spin"
        size={sizeMap[size].icon}
      />
      <span className={sizeMap[size].text}>{text}</span>
    </div>
  );
};

export default Loading;