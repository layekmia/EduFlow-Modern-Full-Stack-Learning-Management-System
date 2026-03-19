import { Suspense } from "react";
import { Metadata } from "next";
import { getAllCourses } from "@/app/data/courses/getAllCourses";
import PublicCourseCard from "../_components/PublicCourseCard";
import PublicCourseCardSkeleton from "../_components/PublicCourseCardSkeleton";
import SearchBar from "./_components/SearchBar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explore Courses",
  description:
    "Discover our wide range of courses designed to help you achieve your learning goals.",
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function PublicCoursesRoute({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Discover our wide range of courses designed to help you achieve your
          learning goals.
        </p>
      </div>

      <SearchBar initialSearch={q} />

      <Suspense key={q} fallback={<SkeletonLayout />}>
        <RenderPublicCourse search={q} />
      </Suspense>
    </div>
  );
}

async function RenderPublicCourse({ search }: { search: string }) {
  const courses = await getAllCourses({ search });

  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">
          No courses found {search ? `for "${search}"` : ""}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

function SkeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <PublicCourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
