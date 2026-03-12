// app/data/dashboard/get-recent-activity.ts
import prisma from "@/lib/prisma";

export type ActivityType =
    | { type: "completed"; lessonTitle: string; lessonId: string; courseTitle: string; courseSlug: string; timestamp: Date; duration?: number }
    | { type: "started"; lessonTitle: string; lessonId?: string; courseTitle: string; courseSlug: string; timestamp: Date }
    | { type: "enrolled"; courseTitle: string; courseSlug: string; timestamp: Date };

export async function getRecentActivity(userId: string) {
    // Get lesson completions (completed lessons)
    const completedLessons = await prisma.lessonProgress.findMany({
        where: {
            userId,
            completed: true,
        },
        select: {
            updatedAt: true,
            lesson: {
                select: {
                    title: true,
                    id: true,
                    chapter: {
                        select: {
                            course: {
                                select: {
                                    title: true,
                                    slug: true,
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            updatedAt: "desc",
        },
        take: 10,
    });

    // Get lesson starts (lessons with progress but not completed)
    const startedLessons = await prisma.lessonProgress.findMany({
        where: {
            userId,
            completed: false,
        },
        select: {
            createdAt: true,
            lesson: {
                select: {
                    title: true,
                    id: true,
                    chapter: {
                        select: {
                            course: {
                                select: {
                                    title: true,
                                    slug: true,
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 10,
    });

    // Get enrollments (new courses purchased)
    const enrollments = await prisma.enrollment.findMany({
        where: {
            userId,
            status: "Active",
        },
        select: {
            createdAt: true,
            course: {
                select: {
                    title: true,
                    slug: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 10,
    });

    // Combine and transform all activities
    const activities: ActivityType[] = [
        // Completed lessons
        ...completedLessons.map((item) => ({
            type: "completed" as const,
            lessonTitle: item.lesson.title,
            lessonId: item.lesson.id,
            courseTitle: item.lesson.chapter.course.title,
            courseSlug: item.lesson.chapter.course.slug,
            timestamp: item.updatedAt,
        })),

        // Started lessons
        ...startedLessons.map((item) => ({
            type: "started" as const,
            lessonTitle: item.lesson.title,
            lessonId: item.lesson.id,
            courseTitle: item.lesson.chapter.course.title,
            courseSlug: item.lesson.chapter.course.slug,
            timestamp: item.createdAt,
        })),

        // New enrollments
        ...enrollments.map((item) => ({
            type: "enrolled" as const,
            courseTitle: item.course.title,
            courseSlug: item.course.slug,
            timestamp: item.createdAt,
        })),
    ];

    // Sort all activities by timestamp (most recent first)
    const sortedActivities = activities.sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );

    // Return only the most recent 20 activities
    return sortedActivities.slice(0, 20);
}

export type RecentActivityType = Awaited<ReturnType<typeof getRecentActivity>>[number];