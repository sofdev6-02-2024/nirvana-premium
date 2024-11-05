interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "secondary" | "outline";
}

export default function Badge({ children, variant = "secondary" }: BadgeProps) {
  let variantClasses = "";

  switch (variant) {
    case "success":
      variantClasses = "bg-orange-100 text-orange-800 border-orange-300";
      break;
    case "secondary":
      variantClasses = "bg-gray-100 text-gray-800 border-gray-300";
      break;
    case "outline":
      variantClasses = "bg-transparent text-gray-800 border-gray-300";
      break;
    default:
      variantClasses = "bg-gray-100 text-gray-800 border-gray-300";
  }

  return (
    <span
      className={`rounded border px-2 py-0.5 text-sm font-medium ${variantClasses}`}
    >
      {children}
    </span>
  );
}
