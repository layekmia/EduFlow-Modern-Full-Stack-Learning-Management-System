import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { formatAmountWithSymbol } from "@/utils/helper";

interface UserEnrollmentsProps {
  enrollments: Array<{
    id: string;
    status: string;
    amount: number;
    createdAt: Date;
    course: {
      id: string;
      title: string;
      slug: string;
    };
  }>;
}

export default function UserEnrollments({ enrollments }: UserEnrollmentsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-600";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-600";
      case "Cancelled":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        {enrollments.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No enrollments yet
          </p>
        ) : (
          <div className="space-y-4">
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="p-3 border rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{enrollment.course.title}</p>
                  <Badge className={getStatusColor(enrollment.status)}>
                    {enrollment.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </span>
                  <span className="font-medium">
                    {formatAmountWithSymbol(enrollment.amount)}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/admin/courses/${enrollment.course.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Course
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
