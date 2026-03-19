"use client";

import { CourseDescription } from "@/app/(public)/courses/[slug]/_components/CourseDescription";
import { LessonContentType } from "@/app/data/courses/get-lesson-content";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";
import { tryCatch } from "@/lib/try-catch";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { markLessonComplete } from "../actions";
import VideoPlayer from "./VideoPlayer";
import { useCourse } from "@/context/course-context";

interface iAppProps {
  data: LessonContentType;
}

export default function CourseContent({ data }: iAppProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  const courseData = useCourse();

  // Flatten all lessons with their order
  const getAllLessons = () => {
    const lessons: { id: string; chapterId: string; title: string }[] = [];
    courseData.chapter.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        lessons.push({
          id: lesson.id,
          chapterId: chapter.id,
          title: lesson.title,
        });
      });
    });
    return lessons;
  };

  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex((l) => l.id === data.id);

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const findNextLesson = () => nextLesson;

  function navigateToLesson(lessonId: string) {
    router.push(
      `/dashboard/my-courses/${data.chapter.course.slug}/${lessonId}`,
    );
  }

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, data.chapter.course.slug),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
        triggerConfetti();

        const next = findNextLesson();

        if (next) {
          navigateToLesson(next.id);
        }
      } else if (result?.status === "error") {
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

      <div className="py-4 border-b flex items-center justify-between gap-2">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant={"outline"}
            size="sm"
            className="bg-green-500/10 text-green-500 hover:text-green-600 border-green-200"
          >
            <CheckCircle className="size-4 mr-2 text-green-500" /> Completed
          </Button>
        ) : (
          <Button
            disabled={pending}
            variant={"outline"}
            size="sm"
            onClick={onSubmit}
            className="min-w-[140px]"
          >
            {pending ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle className="size-4 mr-2 text-green-500" />
                Mark as Complete
              </>
            )}
          </Button>
        )}

        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => prevLesson && navigateToLesson(prevLesson.id)}
            disabled={!prevLesson}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => nextLesson && navigateToLesson(nextLesson.id)}
            disabled={!nextLesson}
            className="gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="py-2 px-1 flex justify-between items-center text-sm text-muted-foreground border-b">
        <span>
          Lesson {currentIndex + 1} of {allLessons.length}
        </span>
        {prevLesson && nextLesson && (
          <span className="text-xs">
            {prevLesson.title} → {nextLesson.title}
          </span>
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
