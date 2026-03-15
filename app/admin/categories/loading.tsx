import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 mb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto space-y-3">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-64" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Create Button Skeleton */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Table Skeleton */}
          <Card>
            <CardContent className="p-0">
              <div className="border-b p-4">
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-4 w-20" />
                  ))}
                </div>
              </div>
              <div className="p-4 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}