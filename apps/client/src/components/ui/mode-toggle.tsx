'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ModeToggleProps {
  variant?: 'default' | 'mobile';
  className?: string;
}

export function ModeToggle({ variant = 'default', className }: ModeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  if (variant === 'mobile') {
    return (
      <Button
        variant="ghost"
        onClick={toggleTheme}
        className={cn(
          'w-full justify-start gap-2 h-11',
          'text-muted-foreground hover:text-accent-foreground hover:bg-accent',
          className,
        )}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        <span className="font-medium">Theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        'h-10 w-10',
        'text-muted-foreground hover:text-accent-foreground hover:bg-accent',
        className,
      )}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
