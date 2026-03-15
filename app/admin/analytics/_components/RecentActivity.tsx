import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface RecentActivityProps {
  activities: {
    enrollments: Array<{
      id: string;
      createdAt: Date;
      user: { name: string; image?: string | null };
      course: { title: string };
    }>;
    courses: Array<{
      id: string;
      title: string;
      createdAt: Date;
      user: { name: string };
    }>;
  };
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const allActivities = [
    ...activities.enrollments.map((e) => ({
      id: e.id,
      type: "enrollment",
      user: e.user.name,
      description: `enrolled in ${e.course.title}`,
      time: e.createdAt,
    })),
    ...activities.courses.map((c) => ({
      id: c.id,
      type: "course",
      user: c.user.name,
      description: `created course: ${c.title}`,
      time: c.createdAt,
    })),
  ].sort((a, b) => b.time.getTime() - a.time.getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {allActivities.slice(0, 5).map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(activity.time), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}