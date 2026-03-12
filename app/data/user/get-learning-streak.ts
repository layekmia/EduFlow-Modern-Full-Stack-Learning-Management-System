// app/data/dashboard/get-learning-streak.ts
import prisma from "@/lib/prisma";

export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    totalLearningDays: number;
    weeklyGoal: number;
    weeklyProgress: number;
    lastActiveDate: Date | null;
}

export async function getLearningStreak(userId: string): Promise<StreakData> {
    // Get all unique days the user was active (completed or started lessons)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get all lesson progress entries for the last 30 days
    const recentActivity = await prisma.lessonProgress.findMany({
        where: {
            userId,
            updatedAt: {
                gte: thirtyDaysAgo,
            },
        },
        select: {
            updatedAt: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });

    // Extract unique dates (user might have multiple activities per day)
    const activeDates = new Set<string>();
    recentActivity.forEach((activity) => {
        const dateStr = activity.updatedAt.toISOString().split('T')[0];
        activeDates.add(dateStr);
    });

    // Convert to sorted array of Date objects
    const activeDays = Array.from(activeDates)
        .map(dateStr => new Date(dateStr))
        .sort((a, b) => a.getTime() - b.getTime());

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if user was active today or yesterday to start streak
    const wasActiveToday = activeDates.has(today.toISOString().split('T')[0]);
    const wasActiveYesterday = activeDates.has(yesterday.toISOString().split('T')[0]);

    if (wasActiveToday || wasActiveYesterday) {
        currentStreak = 1;
        const checkDate = wasActiveToday ? yesterday : new Date(yesterday);
        checkDate.setDate(checkDate.getDate() - 1);

        while (true) {
            const dateStr = checkDate.toISOString().split('T')[0];
            if (activeDates.has(dateStr)) {
                currentStreak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    let prevDate: Date | null = null;

    activeDays.forEach((date) => {
        if (prevDate) {
            const diffDays = Math.floor(
                (date.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (diffDays === 1) {
                tempStreak++;
            } else {
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 1;
            }
        } else {
            tempStreak = 1;
        }
        prevDate = date;
    });
    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate total learning days (all time)
    const allTimeActivity = await prisma.lessonProgress.findMany({
        where: { userId },
        select: { updatedAt: true },
    });

    const allActiveDates = new Set<string>();
    allTimeActivity.forEach((activity) => {
        const dateStr = activity.updatedAt.toISOString().split('T')[0];
        allActiveDates.add(dateStr);
    });
    const totalLearningDays = allActiveDates.size;

    // Weekly goal progress (current week)
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay()); // Start from Sunday

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const weekActivity = await prisma.lessonProgress.findMany({
        where: {
            userId,
            updatedAt: {
                gte: weekStart,
                lt: weekEnd,
            },
        },
        select: { updatedAt: true },
    });

    const weekActiveDates = new Set<string>();
    weekActivity.forEach((activity) => {
        const dateStr = activity.updatedAt.toISOString().split('T')[0];
        weekActiveDates.add(dateStr);
    });
    const weeklyProgress = weekActiveDates.size;

    // Get last active date
    const lastActivity = await prisma.lessonProgress.findFirst({
        where: { userId },
        orderBy: { updatedAt: "desc" },
        select: { updatedAt: true },
    });

    return {
        currentStreak,
        longestStreak,
        totalLearningDays,
        weeklyGoal: 5, // You can make this configurable per user
        weeklyProgress,
        lastActiveDate: lastActivity?.updatedAt || null,
    };
}