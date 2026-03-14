import { Skeleton } from "@/components/ui/skeleton";

export default function CourseSidebarLoader() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      {/* Course Info Section */}
      <div className="pb-4 lg:pr-4 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="size-10 rounded-lg bg-primary/10" />
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-5 w-full max-w-[200px]" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>

          <Skeleton className="h-1.5 w-full rounded-full" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>

      {/* Chapters Section */}
      <div className="py-4 pr-4 space-y-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-2">
            {/* Chapter Button Skeleton */}
            <div className="w-full p-3 border rounded-lg flex items-center gap-2">
              <Skeleton className="size-4 shrink-0" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>

            {/* Lesson Items Skeleton (show for first chapter) */}
            {index === 0 && (
              <div className="mt-3 pl-6 border-l-2 space-y-3">
                {[1, 2, 3].map((lessonIdx) => (
                  <div key={lessonIdx} className="flex items-center gap-3 py-1">
                    <Skeleton className="size-2 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
