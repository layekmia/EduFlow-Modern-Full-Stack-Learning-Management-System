import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getRecentEnrollments } from "@/app/data/admin/get-recent-enrollments";
import { formatDistanceToNow } from "date-fns";

export default async function RecentActivity() {
  const enrollments = await getRecentEnrollments();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enrollments.slice(0, 5).map((enrollment) => (
            <div key={enrollment.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {enrollment.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {enrollment.user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Enrolled in {enrollment.course.title}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(enrollment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
