import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Users } from "lucide-react";
import Link from "next/link";

interface PopularCoursesProps {
  courses: Array<{
    id: string;
    title: string;
    slug: string;
    price: number;
    level: string;
    _count: {
      enrollments: number;
      chapter: number;
    };
  }>;
}

export default function PopularCourses({ courses }: PopularCoursesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Courses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium">{course.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="outline">{course.level}</Badge>
                <span className="text-xs text-muted-foreground">
                  {course._count.chapter} chapters
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-3 w-3" />
                  <span>{course._count.enrollments} enrolled</span>
                </div>
                <span className="text-sm font-medium">
                  ${(course.price / 100).toFixed(2)}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/courses/${course.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
