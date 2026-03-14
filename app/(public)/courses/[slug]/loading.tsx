import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CourseDetailsLoading() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5 animate-pulse">
      {/* Left Column - Course Content */}
      <div className="order-1 lg:col-span-2">
        {/* Thumbnail Skeleton */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-900" />

        <div className="mt-8 space-y-6">
          {/* Title & Description Skeletons */}
          <div className="space-y-4">
            <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-900 rounded" />
            <div className="h-6 w-full bg-gray-200 dark:bg-gray-900 rounded" />
            <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-900 rounded" />
          </div>

          {/* Badges Skeleton */}
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-24 bg-gray-200 dark:bg-gray-900 rounded-full"
              />
            ))}
          </div>

          <Separator className="my-8" />

          {/* Description Skeleton */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-900 rounded" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-900 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-900 rounded" />
          </div>

          {/* Course Content Header Skeleton */}
          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-900 rounded" />
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-900 rounded" />
            </div>

            {/* Chapters Skeletons */}
            <div className="space-y-4">
              {[1, 2, 3].map((chapter) => (
                <Card key={chapter} className="p-0 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Chapter Number Skeleton */}
                        <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-900" />

                        <div className="space-y-2">
                          {/* Chapter Title Skeleton */}
                          <div className="h-6 w-64 bg-gray-200 dark:bg-gray-900 rounded" />
                          {/* Lesson Count Skeleton */}
                          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-900 rounded" />
                        </div>
                      </div>

                      {/* Badge Skeleton */}
                      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-900 rounded-full" />
                    </div>

                    {/* Lessons Preview Skeletons */}
                    <div className="mt-4 space-y-2">
                      {[1, 2].map((lesson) => (
                        <div
                          key={lesson}
                          className="flex items-center gap-4 p-2"
                        >
                          <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-900" />
                          <div className="flex-1">
                            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-900 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Enrollment Card Skeleton */}
      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20 self-start">
          <Card className="py-0">
            <CardContent className="p-6 space-y-4">
              {/* Price Skeleton */}
              <div className="flex items-center justify-between">
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-900 rounded" />
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-900 rounded" />
              </div>

              {/* Course Details Skeletons */}
              <div className="space-y-3 rounded-lg bg-muted p-4">
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-900 rounded" />

                {/* Duration Skeleton */}
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-900" />
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-900 rounded" />
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-900 rounded" />
                  </div>
                </div>

                {/* Level Skeleton */}
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-900" />
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-900 rounded" />
                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-900 rounded" />
                  </div>
                </div>

                {/* Category Skeleton */}
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-900" />
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-900 rounded" />
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-900 rounded" />
                  </div>
                </div>

                {/* Lessons Count Skeleton */}
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-900" />
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-900 rounded" />
                    <div className="h-3 w-12 bg-gray-200 dark:bg-gray-900 rounded" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-900 rounded" />
                <ul className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="size-5 rounded-full bg-gray-200 dark:bg-gray-900" />
                      <div className="h-4 w-40 bg-gray-200 dark:bg-gray-900 rounded" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-11 w-full bg-gray-200 dark:bg-gray-900 rounded" />

              {/* Guarantee Text Skeleton */}
              <div className="h-3 w-40 mx-auto bg-gray-200 dark:bg-gray-900 rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
