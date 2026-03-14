import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function MyCoursesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      {/* Header Section with Gradient */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10">
        <div className="space-y-3">
          <Skeleton className="h-9 w-64 bg-gradient-to-r from-primary/20 to-primary/5" />
          <Skeleton className="h-5 w-96 bg-muted" />
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <CourseProgressCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Available Courses Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <PublicCourseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseProgressCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
      {/* Image Skeleton with Overlay */}
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        <Skeleton className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Title and Meta */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>

        {/* Button Skeleton with Gradient */}
        <Skeleton className="h-10 w-full rounded-md bg-gradient-to-r from-primary/10 to-primary/5" />
      </CardContent>
    </Card>
  );
}

function PublicCourseCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50 hover:shadow-xl transition-all duration-300">
      {/* Image Skeleton */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Skeleton className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
        <div className="absolute top-2 right-2">
          <Skeleton className="h-6 w-16 rounded-full bg-gradient-to-r from-primary/20 to-primary/5" />
        </div>
      </div>

      <CardContent className="p-5 space-y-3">
        {/* Title */}
        <Skeleton className="h-6 w-4/5" />

        {/* Description lines */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Metadata Icons */}
        <div className="flex items-center gap-4 pt-1">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-24 rounded-md bg-gradient-to-r from-primary/10 to-primary/5" />
        </div>
      </CardContent>
    </Card>
  );
}
