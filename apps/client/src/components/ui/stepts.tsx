"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepsProps {
  steps: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  currentStep: number;
  onChange?: (step: number) => void;
}

export function Steps({ steps, currentStep, onChange }: StepsProps) {
  return (
    <nav aria-label="Progress">
      <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => {
          const isCurrent = currentStep === step.id;
          const isComplete = currentStep > step.id;

          return (
            <li
              key={step.name}
              className="md:flex-1"
              onClick={() => {
                if (onChange && (isComplete || step.id === currentStep - 1)) {
                  onChange(step.id);
                }
              }}
            >
              <div
                className={cn(
                  "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                  isCurrent
                    ? "border-primary"
                    : isComplete
                      ? "cursor-pointer border-primary"
                      : "cursor-not-allowed border-muted-foreground/20",
                )}
              >
                <span className="text-sm font-medium">
                  {isComplete ? (
                    <span className="flex items-center gap-2 text-primary">
                      <Check className="h-4 w-4" />
                      {step.name}
                    </span>
                  ) : (
                    <span
                      className={cn(
                        isCurrent ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {step.name}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    isCurrent ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {step.description}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
