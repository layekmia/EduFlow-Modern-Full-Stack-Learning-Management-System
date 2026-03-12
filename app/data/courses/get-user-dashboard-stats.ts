import prisma from "@/lib/prisma";

export interface DashboardStats {
    enrolledCourses: number;
    completedCourses: number;
    lessonsCompleted: number;
    hoursLearned: number;
}

export async function getUserDashboardStats(userId: string): Promise<DashboardStats> {
    const enrollments = await prisma.enrollment.findMany({
        where: {
            userId,
            status: "Active",
        },
        select: {
            course: {
                select: {
                    id: true,
                    chapter: {
                        select: {
                            lessons: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    const lessonProgress = await prisma.lessonProgress.findMany({
        where: {
            userId,
            completed: true,
        },
        select: {
            lessonId: true,
            updatedAt: true,
            lesson: {
                select: {
                    chapter: {
                        select: {
                            courseId: true,
                        },
                    },
                },
            },
        },
    });

    const enrolledCourses = enrollments.length;

    let completedCourses = 0;
    const courseLessonsMap = new Map<string, number>();
    const completedLessonsMap = new Map<string, Set<string>>();


    enrollments.forEach((enrollment) => {
        const courseId = enrollment.course.id;
        let totalLessons = 0;

        enrollment.course.chapter.forEach((chapter) => {
            totalLessons += chapter.lessons.length;
        });

        courseLessonsMap.set(courseId, totalLessons);
        completedLessonsMap.set(courseId, new Set());
    });


    lessonProgress.forEach((progress) => {
        const courseId = progress.lesson?.chapter?.courseId;
        if (courseId && completedLessonsMap.has(courseId)) {
            completedLessonsMap.get(courseId)?.add(progress.lessonId);
        }
    });

    courseLessonsMap.forEach((totalLessons, courseId) => {
        const completedCount = completedLessonsMap.get(courseId)?.size || 0;
        if (completedCount === totalLessons && totalLessons > 0) {
            completedCourses++;
        }
    });

    const lessonsCompleted = lessonProgress.length;

    // Calculate hours learned (assuming average 15 minutes per lesson)
    // You can make this more accurate by tracking actual time spent
    const minutesLearned = lessonsCompleted * 15;
    const hoursLearned = Math.round(minutesLearned / 60 * 10) / 10; // Round to 1 decimal

    return {
        enrolledCourses,
        completedCourses,
        lessonsCompleted,
        hoursLearned,
    };
}