import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function BillingsPageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 mb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-3">
            <Skeleton className="h-10 w-64 bg-gradient-to-r from-primary/20 to-primary/5" />
            <Skeleton className="h-5 w-96 bg-muted" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-6">
        {/* Billing Overview Skeletons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-7 w-24" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Billing Settings (Payment History) Skeleton */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-4 w-64 mt-1" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="flex flex-col gap-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    {/* Left side - Course info */}
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>

                    {/* Right side - Amount & Actions */}
                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <Skeleton className="h-6 w-20" />
                      
                      {/* Status Badge Skeleton */}
                      <Skeleton className="h-5 w-16 rounded-full" />

                      {/* Buttons Skeleton */}
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-24 rounded-md" />
                        <Skeleton className="h-8 w-24 rounded-md" />
                      </div>
                    </div>
                  </div>
                  {i < 3 && <div className="h-[1px] bg-border my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}