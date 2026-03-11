import { Loader2 } from "lucide-react";

export default function CourseLoader() {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col  items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          Preparing Your Dashboard...
        </p>
      </div>
    </div>
  );
}
