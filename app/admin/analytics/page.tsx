import { Metadata } from "next";
import {
  getOverviewStats,
  getUserGrowth,
  getCourseStats,
  getRevenueStats,
  getPopularCourses,
  getRecentActivity,
} from "@/app/data/admin/get-analytics";
import OverviewCards from "./_components/OverviewCards";
import UserGrowthChart from "./_components/UserGrowthChart";
import RevenueChart from "./_components/RevenueChart";
import CourseStats from "./_components/CourseStats";
import PopularCourses from "./_components/PopularCourses";
import RecentActivity from "./_components/RecentActivity";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description:
    "Track platform performance, user growth, revenue, and course engagement.",
};

export default async function AnalyticsPage() {
  const [
    overview,
    userGrowth,
    courseStats,
    revenueStats,
    popularCourses,
    recentActivity,
  ] = await Promise.all([
    getOverviewStats(),
    getUserGrowth(),
    getCourseStats(),
    getRevenueStats(),
    getPopularCourses(),
    getRecentActivity(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 mb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your platform&apos;s performance and growth metrics
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <OverviewCards data={overview} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserGrowthChart data={userGrowth} />
            <RevenueChart data={revenueStats} />
          </div>

          <CourseStats data={courseStats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PopularCourses courses={popularCourses} />
            </div>
            <div className="lg:col-span-1">
              <RecentActivity activities={recentActivity} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}