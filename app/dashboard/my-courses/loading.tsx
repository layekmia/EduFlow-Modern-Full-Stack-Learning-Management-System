export default function MyCoursesLoading() {
  return (
    <>
      <div className="flex flex-col gap-2 mb-6">
        <div className="h-9 w-48 bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />
        <div className="h-5 w-96 bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />
      </div>

      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <CourseProgressCardSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <div className="h-9 w-48 bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />
        <div className="h-5 w-96 bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <PublicCourseCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}

function CourseProgressCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-900 animate-pulse" />

      <div className="p-4 space-y-4">
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />

        <div className="space-y-2">
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />
        </div>

        <div className="h-10 w-full bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />
      </div>
    </div>
  );
}

function PublicCourseCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-900 animate-pulse" />

      <div className="p-4 space-y-3">
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />

        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />
        </div>

        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />

        <div className="h-10 w-full bg-gray-200 dark:bg-gray-900 rounded animate-pulse" />
      </div>
    </div>
  );
}
