import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, DollarSign, Users } from "lucide-react";

interface StatsCardsProps {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  pendingCourses: number;
}

export default function StatsCards({
  totalUsers,
  totalCourses,
  totalRevenue,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      change: "+12%",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Courses",
      value: totalCourses,
      icon: BookOpen,
      change: "+3",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+23%",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className={stat.color}>{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
