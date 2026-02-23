import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminCourseCardSkeleton() {
  return (
    <Card className="relative py-0 gap-0 overflow-hidden">
      <div className="absolute top-2 right-2 z-10">
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
      <Skeleton className="w-full aspect-video rounded-t-lg" />

      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-5 w-[85%]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>

        <div className="flex items-center gap-x-5 pt-2">
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-10" />
          </div>

          <div className="flex items-center gap-x-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        <Skeleton className="h-10 w-full mt-4 rounded-md" />
      </CardContent>
    </Card>
  );
}
