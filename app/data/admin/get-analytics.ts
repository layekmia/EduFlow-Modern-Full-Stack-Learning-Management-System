import prisma from "@/lib/prisma";
import { requireAdmin } from "./require-admin";

export async function getOverviewStats() {
  await requireAdmin();

  const [totalUsers, totalCourses, totalEnrollments, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.enrollment.aggregate({
      where: { status: "Active" },
      _sum: { amount: true },
    }),
  ]);

  const activeEnrollments = await prisma.enrollment.count({
    where: { status: "Active" },
  });

  const completedLessons = await prisma.lessonProgress.count({
    where: { completed: true },
  });

  return {
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalRevenue: totalRevenue._sum.amount || 0,
    activeEnrollments,
    completedLessons,
  };
}

export async function getUserGrowth() {
  await requireAdmin();

  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear(),
      start: new Date(date.getFullYear(), date.getMonth(), 1),
      end: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    };
  }).reverse();

  const userGrowth = await Promise.all(
    last12Months.map(async ({ month, year, start, end }) => {
      const count = await prisma.user.count({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      });
      return { month: `${month} ${year}`, users: count };
    })
  );

  return userGrowth;
}

export async function getCourseStats() {
  await requireAdmin();

  const courses = await prisma.course.groupBy({
    by: ['status'],
    _count: true,
  });

  const byLevel = await prisma.course.groupBy({
    by: ['level'],
    _count: true,
  });

  const byCategory = await prisma.course.groupBy({
    by: ['category'],
    _count: true,
    orderBy: {
      _count: {
        category: 'desc',
      },
    },
    take: 5,
  });

  const averagePrice = await prisma.course.aggregate({
    _avg: { price: true },
  });

  return {
    byStatus: courses,
    byLevel,
    byCategory,
    averagePrice: averagePrice._avg.price || 0,
  };
}

export async function getRevenueStats() {
  await requireAdmin();

  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      start: new Date(date.getFullYear(), date.getMonth(), 1),
      end: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    };
  }).reverse();

  const revenue = await Promise.all(
    last6Months.map(async ({ month, start, end }) => {
      const result = await prisma.enrollment.aggregate({
        where: {
          status: "Active",
          createdAt: {
            gte: start,
            lte: end,
          },
        },
        _sum: { amount: true },
      });
      return { month, revenue: (result._sum.amount || 0) / 100 };
    })
  );

  return revenue;
}

export async function getPopularCourses(limit: number = 5) {
  await requireAdmin();

  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      level: true,
      _count: {
        select: {
          enrollments: true,
          chapter: true,
        },
      },
    },
    orderBy: {
      enrollments: {
        _count: 'desc',
      },
    },
    take: limit,
  });

  return courses;
}

export async function getRecentActivity() {
  await requireAdmin();

  const recentEnrollments = await prisma.enrollment.findMany({
    where: { status: "Active" },
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      course: {
        select: {
          title: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const recentCourses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return {
    enrollments: recentEnrollments,
    courses: recentCourses,
  };
}