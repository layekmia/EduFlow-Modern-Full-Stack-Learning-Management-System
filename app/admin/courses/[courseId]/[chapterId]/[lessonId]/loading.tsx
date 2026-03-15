import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LessonFormLoading() {
  return (
    <div className="animate-pulse">
      {/* Back Button Skeleton */}
      <div className="mb-6">
        <Button variant="outline" className="gap-2" disabled>
          <ArrowLeft className="size-4" />
          <span>Go Back</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Configuration</CardTitle>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded mt-1" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Lesson Name Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Description Field - Rich Text Editor Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="border rounded-lg p-4 space-y-3">
                {/* Toolbar Skeleton */}
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-8 w-8 rounded-md" />
                  ))}
                </div>
                {/* Editor Area Skeleton */}
                <Skeleton className="h-32 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>

            {/* Thumbnail Image Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="border-2 border-dashed rounded-lg p-6">
                <div className="flex flex-col items-center gap-3">
                  <Skeleton className="h-14 w-14 rounded-full" />
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>

            {/* Video File Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="border-2 border-dashed rounded-lg p-6">
                <div className="flex flex-col items-center gap-3">
                  <Skeleton className="h-14 w-14 rounded-full" />
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
