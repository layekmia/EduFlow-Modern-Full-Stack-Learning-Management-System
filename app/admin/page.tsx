import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { getEnrollmentChartData } from "../data/admin/admin-get-dashbaord-stats";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { adminGetRecentCourses } from "../data/admin/admin-get-recent-courses";
import EmptyState from "@/components/general/EmptyState";
import AdminCourseCard from "./courses/_components/AdminCourseCard";
import { Suspense } from "react";
import AdminCourseCardSkeleton from "./courses/_components/AdminCourseCardSkeleton";

export default async function AdminIndexPage() {
  const chartData = await getEnrollmentChartData();

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive chartData={chartData} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/admin/courses"
          >
            View All Courses
          </Link>
        </div>

        <Suspense fallback={<CoursesSkeleton />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
}

async function RenderRecentCourses() {
  const courses = await adminGetRecentCourses();

  if (courses.length === 0) {
    return (
      <EmptyState
        buttonText="Create new Course"
        description="You don't have any courses. create some to see them here"
        title="You don't have any course yet"
        href="/admin/courses/create"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course) => (
        <AdminCourseCard data={course} key={course.id} />
      ))}
    </div>
  );
}

function CoursesSkeleton() {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
      {Array.from({ length: 2 }).map((_, i) => (
        <AdminCourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
