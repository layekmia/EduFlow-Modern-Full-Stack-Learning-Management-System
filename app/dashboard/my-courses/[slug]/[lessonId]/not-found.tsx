import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BookX } from "lucide-react";

export default function CourseNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <BookX className="size-8" />
      </div>

      <p className="mb-2 text-sm font-medium text-primary">Lesson not found</p>

      <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
        This lesson does not exist
      </h1>

      <p className="mb-8 max-w-md text-sm text-muted-foreground md:text-base">
        The lesson you are looking for may have been removed, renamed, or the
        link may be incorrect.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/dashboard" className={buttonVariants()}>
          Go Back
        </Link>
      </div>
    </div>
  );
}
