import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'success' | 'secondary' | 'outline';
  className?: string;
}

export default function Badge({
  children,
  variant = 'secondary',
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    success:
      'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-800',
    secondary:
      'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700',
    outline:
      'bg-transparent text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-2 py-0.5 text-sm font-medium transition-colors',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
