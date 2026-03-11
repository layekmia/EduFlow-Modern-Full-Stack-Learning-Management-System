import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BookX } from "lucide-react";

export default function CourseNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <BookX className="size-8" />
      </div>

      <p className="mb-2 text-sm font-medium text-primary">Course not found</p>

      <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
        This course does not exist
      </h1>

      <p className="mb-8 max-w-md text-sm text-muted-foreground md:text-base">
        The course you are looking for may have been removed, renamed, or the
        link may be incorrect.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/courses" className={buttonVariants()}>
          Browse Courses
        </Link>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
