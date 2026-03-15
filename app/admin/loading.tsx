import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AdminCourseCardSkeleton from "./courses/_components/AdminCourseCardSkeleton";

export default function AdminOverviewLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 mb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto space-y-3">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-96" />
          </div>
        </div>
      </div>

      {/* Section Cards Skeleton */}
      <div className="container mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="mt-4">
                  <Skeleton className="h-3 w-32" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity Skeleton */}
      <div className="container mx-auto px-4 mb-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Chart Skeleton */}
      <div className="container mx-auto px-4 mb-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Courses Section */}
      <div className="container mx-auto px-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {[1, 2].map((i) => (
              <AdminCourseCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
