import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BookX } from "lucide-react";

export default function AdminCourseNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
        <BookX className="size-8" />
      </div>

      <p className="mb-2 text-sm font-medium text-destructive">
        Course not found
      </p>

      <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
        This course does not exist
      </h1>

      <p className="mb-8 max-w-md text-sm text-muted-foreground md:text-base">
        The course you are trying to edit may have been deleted or the ID is
        incorrect.
      </p>

      <div className="flex gap-3">
        <Link href="/admin/courses" className={buttonVariants()}>
          Back to Courses
        </Link>

        <Link href="/admin" className={buttonVariants({ variant: "outline" })}>
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
