import { getCourseSidebarData } from "@/app/data/courses/get-course-sidebar-data";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);

  return {  
    title: course?.course?.title || "Course",
  };
}

export default async function page({ params }: Props) {
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);

  const firstChapter = course?.course?.chapter[0];
  const firstLesson = firstChapter?.lessons[0];

  if (firstLesson) {
    redirect(`/dashboard/my-courses/${slug}/${firstLesson.id}`);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-2xl font-bold mb-2">No lessons available</h2>
      <p className="text-muted-foreground">
        This Course does not have any lessons yet!
      </p>
    </div>
  );
}
