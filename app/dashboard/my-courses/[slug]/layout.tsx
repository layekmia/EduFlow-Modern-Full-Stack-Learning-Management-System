import { getCourseSidebarData } from "@/app/data/courses/get-course-sidebar-data";
import CourseSidebar from "../../_components/CourseSidebar";
import { CourseProvider } from "@/context/course-context";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const courseData = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-1 flex-col-reverse lg:flex-row">
      {/* Sidebar - 30% */}
      <div className="w-full lg:w-80 border-r border-border shrink-0">
        <CourseSidebar course={courseData.course} />
      </div>

      {/* Main content - 70% */}
      <div className="flex-1 overflow-hidden">
        <CourseProvider course={courseData.course}>{children}</CourseProvider>
      </div>
    </div>
  );
}
