interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="border rounded px-2 py-0.5 bg-orange-100 text-muted-foreground text-sm font-medium">
      {children}
    </span>
  );
}
