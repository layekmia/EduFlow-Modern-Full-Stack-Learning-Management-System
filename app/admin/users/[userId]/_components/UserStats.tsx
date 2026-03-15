import { UserDetailsType } from "@/app/data/admin/get-user-details";
import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Clock, CreditCard } from "lucide-react";

interface UserStatsProps {
  user: UserDetailsType;
}

export default function UserStats({ user }: UserStatsProps) {
  const stats = [
    {
      title: "Total Courses",
      value: user._count.courses,
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Enrollments",
      value: user._count.enrollments,
      icon: CreditCard,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Lessons Completed",
      value: user._count.lessonProgress,
      icon: Award,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Member Since",
      value: new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      icon: Clock,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
