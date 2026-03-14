import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <div className="flex items-center justify-center size-16 rounded-xl bg-primary/10 text-primary mb-6">
        <BookOpen className="size-8" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
        Page not found
      </h1>

      <p className="text-muted-foreground max-w-md mb-8">
        Sorry, the page you are looking for doesn’t exist or may have been
        moved.
      </p>

      <div className="flex gap-4">
        <Link href="/dashboard" className={buttonVariants()}>
          Back to Home
        </Link>

        <Link
          href="/dashboard/my-courses"
          className={buttonVariants({ variant: "outline" })}
        >
          Browse Courses
        </Link>
      </div>
    </div>
  );
}
