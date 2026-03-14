import { getCourseSidebarData } from "@/app/data/courses/get-course-sidebar-data";
import { getLessonContent } from "@/app/data/courses/get-lesson-content";
import { Metadata } from "next";
import { Suspense } from "react";
import CourseContent from "./_components/CourseContent";

type Props = {
  params: Promise<{ lessonId: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonId, slug } = await params;

  const [lesson, course] = await Promise.all([
    getLessonContent(lessonId),
    getCourseSidebarData(slug).catch(() => null),
  ]);

  const courseTitle = course?.course?.title || "Course";
  const lessonTitle = lesson?.title || "Lesson";

  return {
    title: `${lessonTitle} | ${courseTitle}`,
    description: lesson?.description || `Continue learning ${courseTitle}`,
  };
}

export default async function LessonContentPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<CourseContentSkeleton />}>
      <LessonContentLoader lessonId={lessonId} />
    </Suspense>
  );
}

async function LessonContentLoader({ lessonId }: { lessonId: string }) {
  const data = await getLessonContent(lessonId);

  return <CourseContent data={data} />;
}

function CourseContentSkeleton() {
  return (
    <div className="flex flex-col h-full bg-background lg:pl-6 animate-pulse">
      <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
        <div className="w-full h-full bg-gray-200 dark:bg-gray-900" />
      </div>

      <div className="py-4 border-b">
        <div className="h-10 w-40 bg-gray-200 dark:bg-gray-900 rounded-md" />
      </div>

      <div className="pt-3 space-y-4">
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-900 rounded" />

        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-900 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-900 rounded" />
          <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-900 rounded" />
        </div>

        <div className="space-y-2 pt-4">
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-900 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-900 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-900 rounded" />
        </div>
      </div>
    </div>
  );
}
