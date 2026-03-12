// app/data/dashboard/get-learning-chart-data.ts
import prisma from "@/lib/prisma";

export interface ChartDataPoint {
    date: string;
    lessons: number;
    minutes: number;
}

export async function getLearningChartData(userId: string, days: number = 30): Promise<ChartDataPoint[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get all lesson progress in the date range
    const progress = await prisma.lessonProgress.findMany({
        where: {
            userId,
            updatedAt: {
                gte: startDate,
            },
        },
        select: {
            updatedAt: true,
            completed: true,
        },
        orderBy: {
            updatedAt: "asc",
        },
    });

    // Create a map of dates to aggregate data
    const dateMap = new Map<string, { lessons: number; minutes: number }>();

    // Initialize all dates in range
    for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        dateMap.set(dateStr, { lessons: 0, minutes: 0 });
    }

    // Aggregate progress data
    progress.forEach((item) => {
        const dateStr = item.updatedAt.toISOString().split('T')[0];
        const existing = dateMap.get(dateStr) || { lessons: 0, minutes: 0 };

        if (item.completed) {
            existing.lessons += 1;
        }
        // Estimate 15 minutes per lesson (you can make this more accurate)
        existing.minutes += 15;

        dateMap.set(dateStr, existing);
    });

    // Convert to array and format dates
    return Array.from(dateMap.entries())
        .map(([date, data]) => ({
            date: new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            }),
            lessons: data.lessons,
            minutes: data.minutes,
        }))
        .slice(-days);
}