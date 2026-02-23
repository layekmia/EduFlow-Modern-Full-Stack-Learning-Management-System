"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tryCatch } from "@/lib/try-catch";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteCourse } from "./actions";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteCourse() {
  const { courseId } = useParams<{ courseId: string }>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteCourse(courseId as string),
      );

      if (error) {
        toast.error("An unexpected error occurred. pease try again");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        router.push("/admin/courses");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="max-w-xl mx-auto w-full">
      <Card className="mt-32">
        <CardHeader>
          <CardTitle>Are you sure want to delete this course?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete your
            lesson from our servers.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Link className={buttonVariants({ variant: "outline" })} href={``}>
            Cancel
          </Link>

          <Button
            disabled={isPending}
            variant={"destructive"}
            onClick={onSubmit}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
