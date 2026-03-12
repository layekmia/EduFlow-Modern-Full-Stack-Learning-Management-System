import { publicCoursesType } from "@/app/data/courses/getAllCourses";
import { Badge } from "@/components/ui/badge";
import { useConstructUrl } from "@/utils/use-constract-url";
import { School, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CompactRecommendedCourseProps {
  course: publicCoursesType;
}

export function RecommendedCourseCard({
  course,
}: CompactRecommendedCourseProps) {
  return (
    <Link href={`/courses/${course.slug}`} className="block group">
      <div className="flex gap-3 p-2 rounded-lg hover:bg-accent/50 transition-all duration-300">
        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={useConstructUrl(course.fileKey)}
            alt={course.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
              {course.title}
            </h4>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
              {course.level}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {course.smallDescription}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <TimerIcon className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {course.duration}h
              </span>
            </div>
            <div className="flex items-center gap-1">
              <School className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {course.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
