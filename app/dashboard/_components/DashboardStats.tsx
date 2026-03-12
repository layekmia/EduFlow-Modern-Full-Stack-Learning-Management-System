import {
  IconBook,
  IconCheck,
  IconClock,
  IconPlayerPlay,
} from "@tabler/icons-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserDashboardStats } from "@/app/data/courses/get-user-dashboard-stats";

interface DashboardStatsProps {
  userId: string;
}

export async function UserDashboardStats({ userId }: DashboardStatsProps) {
  const stats = await getUserDashboardStats(userId);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardDescription>Courses Enrolled</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stats.enrolledCourses}
            </CardTitle>
          </div>
          <div className="p-1 rounded-full bg-primary/20">
            <IconBook className="size-5 text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">
            Courses you currently have access to
          </p>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardDescription>Courses Completed</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stats.completedCourses}
            </CardTitle>
          </div>
          <div className="p-1 rounded-full bg-primary/20">
            <IconCheck className="size-5 text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">
            Courses you have successfully finished
          </p>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardDescription>Lessons Completed</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stats.lessonsCompleted}
            </CardTitle>
          </div>
          <div className="p-1 rounded-full bg-primary/20">
            <IconPlayerPlay className="size-5 text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">
            Total lessons you have completed
          </p>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardDescription>Hours Learned</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stats.hoursLearned}h
            </CardTitle>
          </div>
          <div className="p-1 rounded-full bg-primary/20">
            <IconClock className="size-5 text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">
            Time spent learning on the platform
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
