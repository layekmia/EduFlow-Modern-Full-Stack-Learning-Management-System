import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PublicCourseCardSkeleton() {
  return (
    <Card className="relative py-0 gap-0 overflow-hidden">
      <div className="absolute top-2 right-2 z-10">
        <Skeleton className="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>

      <Skeleton className="w-full aspect-video rounded-t-xl bg-gray-300 dark:bg-gray-700" />

      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-5 w-[85%] bg-gray-300 dark:bg-gray-700" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-4 w-[75%] bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="flex items-center gap-x-5 pt-2">
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-6 w-6 rounded-md bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-4 w-10 bg-gray-300 dark:bg-gray-700" />
          </div>

          <div className="flex items-center gap-x-2">
            <Skeleton className="h-6 w-6 rounded-md bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>

        <Skeleton className="h-10 w-full rounded-md mt-4 bg-gray-300 dark:bg-gray-700" />
      </CardContent>
    </Card>
  );
}
