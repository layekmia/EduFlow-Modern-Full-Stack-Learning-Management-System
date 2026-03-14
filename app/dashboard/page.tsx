import { auth } from "@/lib/auth";
import { formatActivityForDisplay } from "@/utils/format-activity";
import { headers } from "next/headers";
import { getLearningChartData } from "../data/user/get-learning-chart-data";
import { getRecentActivity } from "../data/user/get-recent-activity";
import { UserDashboardStats } from "./_components/DashboardStats";
import { LearningChart } from "./_components/LearningChart";
import { RecentActivity } from "./_components/RecentActivity";
import RecommendedCourse from "./_components/RecommendedCourse";
import { GraduationCap, Sparkles } from "lucide-react";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your learning progress, enrolled courses, and personalized recommendations.",
};


export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return null;
  }

  const activities = await getRecentActivity(session.user.id);
  const formattedActivities = activities.map(formatActivityForDisplay);
  const chartData = await getLearningChartData(session.user.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Welcome back, {session?.user?.name?.split(" ")[0] || "there"}!
              </h1>
            </div>
            <p className="text-muted-foreground text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Ready to continue your learning journey today?
            </p>
          </div>

          <div className="px-4 py-2 rounded-lg bg-card border shadow-sm">
            <p className="text-sm font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <UserDashboardStats userId={session.user.id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2">
          <RecentActivity activities={formattedActivities} />
        </div>

        <div className="lg:col-span-1">
          <RecommendedCourse />
        </div>
      </div>

      <div className="mt-6">
        <LearningChart data={chartData} />
      </div>
    </div>
  );
}
