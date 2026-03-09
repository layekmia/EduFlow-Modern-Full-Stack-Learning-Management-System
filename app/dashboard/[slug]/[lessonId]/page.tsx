import { getLessonContent } from "@/app/data/courses/get-lesson-content";
import CourseContent from "./_components/CourseContent";

export default async function LessonContentPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  const data = await getLessonContent(lessonId);

  return <CourseContent data={data} />;
}
