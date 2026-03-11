"use client";

import { CourseDescription } from "@/app/(public)/courses/[slug]/_components/CourseDescription";
import { LessonContentType } from "@/app/data/courses/get-lesson-content";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";
import { tryCatch } from "@/lib/try-catch";
import { CheckCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { markLessonComplete } from "../actions";
import VideoPlayer from "./VideoPlayer";

interface iAppProps {
  data: LessonContentType;
}

export default function CourseContent({ data }: iAppProps) {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, data.chapter.course.slug),
      );

      if (error) {
        toast.error("An unexpected error occurred. pease try again");
        return;
      }
      if (!result) return;

      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="flex flex-col h-full bg-background lg:pl-6">
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ""}
        videoKey={data.videoKey ?? ""}
      />
      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant={"outline"}
            className="bg-green-500/10 text-green-500 hover:text-green-600"
          >
            <CheckCircle className="size-4 mr-2 text-green-500" /> Completed
          </Button>
        ) : (
          <Button disabled={pending} variant={"outline"} onClick={onSubmit}>
            <CheckCircle className="size-4 mr-2 text-green-500" />
            Mark as Complete
          </Button>
        )}
      </div>

      <div className="pt-3">
        {data.description && (
          <CourseDescription
            description={data.description}
            title={data.title}
          />
        )}
      </div>
    </div>
  );
}
