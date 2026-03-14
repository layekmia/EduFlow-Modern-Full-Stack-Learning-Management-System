import { getPopularCourse } from "@/app/data/courses/getPopularCourse";
import PublicCourseCard from "./PublicCourseCard";

export default async function PopularCourse() {
  const courses = await getPopularCourse();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.slice(0, 3).map((course) => (
        <PublicCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}
