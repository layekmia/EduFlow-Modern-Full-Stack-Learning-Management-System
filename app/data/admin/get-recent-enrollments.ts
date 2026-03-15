import prisma from "@/lib/prisma";

export async function getRecentEnrollments(limit: number = 10) {
  const enrollments = await prisma.enrollment.findMany({
    where: {
      status: "Active", // Only show successful enrollments
    },
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
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
    take: limit,
  });

  return enrollments;
}

export type RecentEnrollmentType = Awaited<ReturnType<typeof getRecentEnrollments>>;