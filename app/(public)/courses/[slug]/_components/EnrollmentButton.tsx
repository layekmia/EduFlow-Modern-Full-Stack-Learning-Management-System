"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/lib/try-catch";
import { useTransition } from "react";
import { enrollInCourseAction } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function EnrollmentButton({ courseId }: { courseId: string }) {
  const [pending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollInCourseAction(courseId),
      );

      if (error) {
        const msg = String((error as Error)?.message ?? error);

        if (msg.includes("NEXT_REDIRECT")) {
          return;
        }

        toast.error("An unexpected error occurred, Please try again");
        return;
      }

      if (result?.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success("Redirecting to secure checkout...");
    });
  }

  return (
    <Button onClick={onSubmit} disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" /> Loading...
        </>
      ) : (
        " Enroll Now!"
      )}
    </Button>
  );
}
