"use client";

import { CourseSidebarDataType } from "@/app/data/courses/get-course-sidebar-data";
import { createContext, useContext } from "react";

const CourseContext = createContext<CourseSidebarDataType["course"] | null>(
  null,
);

export function CourseProvider({
  children,
  course,
}: {
  children: React.ReactNode;
  course: CourseSidebarDataType["course"];
}) {
  return (
    <CourseContext.Provider value={course}>{children}</CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}
