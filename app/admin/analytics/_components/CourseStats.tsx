import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface CourseStatsProps {
  data: {
    byStatus: Array<{ status: string; _count: number }>;
    byLevel: Array<{ level: string; _count: number }>;
    byCategory: Array<{ category: string; _count: number }>;
    averagePrice: number;
  };
}

export default function CourseStats({ data }: CourseStatsProps) {
  const totalCourses = data.byStatus.reduce((acc, curr) => acc + curr._count, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-500/10 text-green-600";
      case "Draft":
        return "bg-yellow-500/10 text-yellow-600";
      case "Archive":
        return "bg-gray-500/10 text-gray-600";
      default:
        return "bg-blue-500/10 text-blue-600";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Course Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.byStatus.map((item) => (
            <div key={item.status}>
              <div className="flex justify-between mb-1">
                <span className="text-sm">{item.status}</span>
                <span className="text-sm font-medium">{item._count}</span>
              </div>
              <Progress value={(item._count / totalCourses) * 100} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Level Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Course Levels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.byLevel.map((item) => (
            <div key={item.level} className="flex justify-between items-center">
              <span className="text-sm">{item.level}</span>
              <Badge variant="outline">{item._count}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.byCategory.map((item) => (
            <div key={item.category} className="flex justify-between items-center">
              <span className="text-sm">{item.category}</span>
              <Badge variant="outline">{item._count}</Badge>
            </div>
          ))}
          <div className="pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Average Price</span>
              <span className="font-bold">
                ${(data.averagePrice / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}