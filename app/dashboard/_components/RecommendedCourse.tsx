import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getPopularCourse } from "@/app/data/courses/getPopularCourse";
import { RecommendedCourseCard } from "./RecommendedCourseCard";

export default async function RecommendedCourse() {
  const courses = await getPopularCourse();

  return (
    <Card>
      <CardHeader className="pb-3 px-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recommended for You</CardTitle>
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link href="/courses">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Based on your learning interests
        </p>
      </CardHeader>
      <CardContent className="space-y-2 px-2">
        {courses.slice(0, 4).map((course) => (
          <RecommendedCourseCard key={course.id} course={course} />
        ))}
      </CardContent>
    </Card>
  );
}
