import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseCreationLoading() {
  return (
    <div className="animate-pulse">
      {/* Back Button Skeleton */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" disabled>
          <ArrowLeft className="size-4" />
        </Button>
        <Skeleton className="h-8 w-48" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide basic information about the course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Slug Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>

            {/* Small Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-24 w-full" />
            </div>

            {/* Description (Rich Text Editor) */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-8 w-8 rounded-md" />
                  ))}
                </div>
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>

            {/* Thumbnail Image */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <div className="border-2 border-dashed rounded-lg p-8">
                <div className="flex flex-col items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>

            {/* Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>

            {/* Status Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full md:w-1/2" />
            </div>

            {/* Submit Button */}
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}