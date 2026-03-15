import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function UsersLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 mb-8">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-20 w-full rounded-lg" />
          
          <Card>
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}