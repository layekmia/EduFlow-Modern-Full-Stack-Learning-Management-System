import { Suspense } from "react";
import { getCourseSidebarData } from "@/app/data/courses/get-course-sidebar-data";
import { CourseProvider } from "@/context/course-context";
import CourseSidebar from "./_compoents/CourseSidebar";
import CourseSidebarLoader from "./_compoents/CourseSidebarLoader";

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
      <div className="w-full lg:w-80 border-r border-border shrink-0">
        <Suspense fallback={<CourseSidebarLoader />}>
          <CourseSidebar slug={slug} />
        </Suspense>
      </div>

      <div className="flex-1 overflow-hidden">
        <CourseProvider course={courseData.course}>{children}</CourseProvider>
      </div>
    </div>
  );
}
