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
import RecentActivity from "./_components/RecentActivity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "Monitor platform performance, user growth, revenue, and pending approvals from your central dashboard.",
};

export default async function AdminIndexPage() {
  const chartData = await getEnrollmentChartData();

  return (
    <>
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 mb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome back, Admin!
            </h1>
            <p className="text-muted-foreground mt-2">
              Here&apos;s what&apos;s happening with your platform today.
            </p>
          </div>
        </div>
      </div>
      <SectionCards />
      <RecentActivity />
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
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
