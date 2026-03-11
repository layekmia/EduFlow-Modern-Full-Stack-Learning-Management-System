import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Puzzle, BarChart3, Users, LucideIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getPopularCourse } from "../data/courses/getPopularCourse";
import PublicCourseCard from "./_components/PublicCourseCard";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated courses designed by industry experts.",
    icon: BookOpen,
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
    icon: Puzzle,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress and achievements with detailed analytics and personalized dashboards.",
    icon: BarChart3,
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and instructors to collaborate and share knowledge.",
    icon: Users,
  },
];

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  const courses = await getPopularCourse();

  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center justify-center space-y-8">
          <Badge variant="outline">The Future of Online Education</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="max-w-175 text-muted-foreground md:text-xl text-center">
            Discover a new way to learn with our modern, interactive learning
            management system. Access high-quality courses time,anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link className={buttonVariants({ size: "lg" })} href="/courses">
              Explore Courses
            </Link>
            {!session?.user && (
              <Link
                className={buttonVariants({ size: "lg", variant: "outline" })}
                href="/login"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-muted hover:border-primary/30"
            >
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section>
        <h2 className="text-left text-3xl font-semibold mb-10">
          Popular Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <PublicCourseCard key={course.id} data={course} />
          ))}
        </div>
      </section>
    </>
  );
}
