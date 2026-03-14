import { getAllCourses } from "@/app/data/courses/getAllCourses";
import { getEnrolledCourses } from "@/app/data/user/get-enrolled-courses";
import EmptyState from "@/components/general/EmptyState";
import CourseProgressCard from "./_components/CourseProgressCard";
import PublicCourseCard from "@/app/(public)/_components/PublicCourseCard";
import { Metadata } from "next";
import { GraduationCap, Sparkles, BookOpen, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "My Courses",
  description:
    "View your enrolled courses and discover new learning opportunities",
};

export default async function MyCourses() {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  const availableCourses = courses.filter(
    (course) =>
      !enrolledCourses.some(
        ({ course: enrolled }) => enrolled.id === course.id,
      ),
  );

  const totalLessons = enrolledCourses.reduce(
    (acc, enroll) =>
      acc +
      enroll.course.chapter.reduce((chAcc, ch) => chAcc + ch.lessons.length, 0),
    0,
  );

  const completedLessons = enrolledCourses.reduce(
    (acc, enroll) =>
      acc +
      enroll.course.chapter.reduce(
        (chAcc, ch) =>
          chAcc +
          ch.lessons.filter((l) => l.lessonProgress?.some((p) => p.completed))
            .length,
        0,
      ),
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                My Courses
              </h1>
            </div>
            <p className="text-muted-foreground text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Track your learning progress and discover new courses
            </p>
          </div>

          {enrolledCourses.length > 0 && (
            <div className="flex items-center gap-4 px-4 py-2 rounded-lg bg-card border shadow-sm">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Enrolled</p>
                <p className="text-xl font-bold text-primary">
                  {enrolledCourses.length}
                </p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Lessons</p>
                <p className="text-xl font-bold text-primary">
                  {completedLessons}/{totalLessons}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Enrolled Courses</h2>
          </div>
          {enrolledCourses.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {enrolledCourses.length} course
              {enrolledCourses.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {enrolledCourses.length === 0 ? (
          <EmptyState
            title="No Courses Enrolled"
            description="You haven't enrolled in any courses yet. Start your learning journey today!"
            buttonText="Browse Courses"
            href="/courses"
            icon={<BookOpen />}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((enroll) => (
              <CourseProgressCard key={enroll.course.id} data={enroll} />
            ))}
          </div>
        )}
      </section>

      {/* Available Courses Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Recommended for You</h2>
          </div>
          {availableCourses.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {availableCourses.length} available
            </p>
          )}
        </div>

        {availableCourses.length === 0 ? (
          <EmptyState
            title="All Caught Up!"
            description="You've enrolled in all available courses. Check back later for new content!"
            buttonText="Explore More"
            href="/courses"
            icon={<TrendingUp />}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableCourses.map((course) => (
              <PublicCourseCard key={course.id} data={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
