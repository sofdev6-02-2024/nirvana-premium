import { Skeleton } from "@/components/ui/skeleton";

export function JobListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-8 w-[120px]" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 rounded-xl border border-gray-200 bg-white p-6"
          >
            <Skeleton className="h-[130px] w-[130px] rounded-xl" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-2/3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
