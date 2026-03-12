import { getAllCourses } from "@/app/data/courses/getAllCourses";
import { getEnrolledCourses } from "@/app/data/user/get-enrolled-courses";
import EmptyState from "@/components/general/EmptyState";
import CourseProgressCard from "../_components/CourseProgressCard";
import PublicCourseCard from "@/app/(public)/_components/PublicCourseCard";

export default async function MyCourses() {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground ">
          Here you can see all the courses you have access to{" "}
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No Courses purchased"
          description="You have not purchased any courses yet"
          buttonText="Browse Courses"
          href="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((enroll) => (
            <CourseProgressCard data={enroll} key={enroll.course.id} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2 mb-5">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground ">
            Here you can see all the courses you can purchase{" "}
          </p>
        </div>

        {courses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ course: enrolled }) => enrolled.id === course.id,
            ),
        ).length === 0 ? (
          <EmptyState
            title="No Courses Available"
            description="You have already purchases all available courses"
            buttonText="Browse courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ course: enrolled }) => enrolled.id === course.id,
                  ),
              )
              .map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
