import { getAllCourses } from "@/app/data/courses/getAllCourses";
import { Suspense } from "react";
import PublicCourseCard from "../_components/PublicCourseCard";
import PublicCourseCardSkeleton from "../_components/PublicCourseCardSkeleton";

export default async function PublicCoursesRoute() {
  return (
    <div className="mt-5">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Discover our wide range of courses designed to help you achieve your
          learning goals.
        </p>
      </div>

      <Suspense fallback={<SkeletonLayout />}>
        <RenderPublicCourse />
      </Suspense>
    </div>
  );
}

async function RenderPublicCourse() {
  const courses = await getAllCourses();
  console.log(courses);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

function SkeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <PublicCourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
