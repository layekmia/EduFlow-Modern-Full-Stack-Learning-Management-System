import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, CheckCircle, PlayCircle, GraduationCap } from "lucide-react";
import Link from "next/link";

export type FormattedActivity = {
  type: "completed" | "started" | "enrolled";
  lessonTitle?: string;
  courseTitle: string;
  lessonId?: string;
  courseSlug: string;
  timestamp: Date;
  timeAgo: string;
  description: string;
};

interface RecentActivityProps {
  activities: FormattedActivity[];
}

function getActivityIcon(type: FormattedActivity["type"]) {
  switch (type) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "started":
      return <PlayCircle className="h-4 w-4 text-blue-500" />;
    case "enrolled":
      return <BookOpen className="h-4 w-4 text-purple-500" />;
  }
}

function getActivityColor(type: FormattedActivity["type"]) {
  switch (type) {
    case "completed":
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    case "started":
      return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
    case "enrolled":
      return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
  }
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Your latest learning moments
          </p>
        </div>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Start your learning journey today! Browse our courses and begin
              learning to see your activity here.
            </p>
            <Button asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div
                    className={`p-2 rounded-full ${getActivityColor(activity.type)}`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium truncate">
                        {activity.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span className="truncate max-w-[200px]">
                        {activity.courseTitle}
                      </span>
                      <span>•</span>
                      <span>{activity.timeAgo}</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <Link
                      href={
                        activity.lessonId
                          ? `/dashboard/my-courses/${activity.courseSlug}/${activity.lessonId}`
                          : `/dashboard/my-courses/${activity.courseSlug}`
                      }
                    >
                      {activity.type === "enrolled"
                        ? "View Course"
                        : "Continue"}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
