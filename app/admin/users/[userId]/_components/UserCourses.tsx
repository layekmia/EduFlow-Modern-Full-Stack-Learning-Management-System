import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

interface UserCoursesProps {
  courses: Array<{
    id: string;
    title: string;
    slug: string;
    price: number;
    status: string;
    createdAt: Date;
    _count: {
      chapter: number;
    };
  }>;
}

export default function UserCourses({ courses }: UserCoursesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses Created</CardTitle>
      </CardHeader>
      <CardContent>
        {courses.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No courses created yet
          </p>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{course.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{course.status}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {course._count.chapter} chapters
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/courses/${course.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
