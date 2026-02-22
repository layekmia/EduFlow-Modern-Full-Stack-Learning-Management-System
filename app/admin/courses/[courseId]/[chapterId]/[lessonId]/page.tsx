import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import LessonForm from "./_components/LessonForm";

export default async function page({
  params,
}: {
  params: Promise<{ lessonId: string; courseId: string; chapterId: string }>;
}) {
  const { lessonId, chapterId, courseId } = await params;

  const lesson = await adminGetLesson(lessonId);

  return <LessonForm data={lesson} chapterId={chapterId} courseId={courseId}/>;
}
