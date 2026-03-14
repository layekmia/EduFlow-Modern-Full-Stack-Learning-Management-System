import { getCourseSidebarData } from "@/app/data/courses/get-course-sidebar-data";
import CourseSidebarClient from "./CourseSidebarClient";

interface CourseSidebarProps {
  slug: string;
}

export default async function CourseSidebar({ slug }: CourseSidebarProps) {
  const courseData = await getCourseSidebarData(slug);

  return <CourseSidebarClient course={courseData.course} />;
}
