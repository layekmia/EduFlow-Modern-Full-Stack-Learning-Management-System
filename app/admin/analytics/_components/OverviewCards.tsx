import { Card, CardContent } from "@/components/ui/card";
import { formatAmountWithSymbol } from "@/utils/helper";
import {
    Activity,
    BookOpen,
    DollarSign,
    Users
} from "lucide-react";

interface OverviewCardsProps {
  data: {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    totalRevenue: number;
    activeEnrollments: number;
    completedLessons: number;
  };
}

export default function OverviewCards({ data }: OverviewCardsProps) {
  const cards = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      change: "+12%",
    },
    {
      title: "Total Courses",
      value: data.totalCourses,
      icon: BookOpen,
      color: "text-green-500",
      bg: "bg-green-500/10",
      change: "+5",
    },
    {
      title: "Total Revenue",
      value: formatAmountWithSymbol(data.totalRevenue),
      icon: DollarSign,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      change: "+23%",
    },
    {
      title: "Total Enrollments",
      value: data.totalEnrollments,
      icon: Activity,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      change: "+18%",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{card.title}</p>
                <p className="text-lg font-bold mt-1">{card.value}</p>
                <p className="text-xs text-green-600 mt-1">{card.change}</p>
              </div>
              <div className={`p-2 rounded-full ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}