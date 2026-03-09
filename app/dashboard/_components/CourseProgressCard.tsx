"use client";

import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { useConstructUrl } from "@/utils/use-constract-url";
import Image from "next/image";
import Link from "next/link";

export default function CourseProgressCard({
  data,
}: {
  data: EnrolledCourseType;
}) {
  const { totalLessons, completedLessons, progressPercentage } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useCourseProgress({ courseData: data.course as any });

  const buttonText =
    progressPercentage === 0
      ? "Start Course"
      : progressPercentage === 100
        ? "Review Course"
        : "Continue Learning";

  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{data.course.level}</Badge>
      <Image
        width={600}
        height={600}
        unoptimized
        className="w-full rounded-t-xl aspect-video h-full object-cover"
        alt="Thumbnail Image of course"
        src={useConstructUrl(data.course.fileKey)}
      />
      <CardContent className="p-4">
        <Link
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
          href={`/dashboard/${data.course.slug}`}
        >
          {data.course.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.course.smallDescription}
        </p>

        <div className="space-y-4 mt-3">
          <div className="flex justify-between mb-1 text-sm">
            <p>Progress:</p>
            <p className="font-medium">{progressPercentage}%</p>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />

          <p>
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        <Link
          href={`/dashboard/${data.course.slug}`}
          className={buttonVariants({
            className: "w-full mt-4",
          })}
        >
          {buttonText}
        </Link>
      </CardContent>
    </Card>
  );
}
