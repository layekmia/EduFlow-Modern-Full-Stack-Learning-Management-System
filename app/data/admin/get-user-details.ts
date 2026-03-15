import prisma from "@/lib/prisma";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export async function getUserDetails(userId: string) {
  await requireAdmin();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      stripeCustomerId: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          courses: true,
          enrollments: true,
          lessonProgress: true,
        },
      },
      settings: {
        select: {
          bio: true,
          website: true,
          location: true,
          phone: true,
          emailNotifications: true,
          pushNotifications: true,
        },
      },
      courses: {
        select: {
          id: true,
          title: true,
          slug: true,
          price: true,
          status: true,
          createdAt: true,
          _count: {
            select: {
              chapter: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
      enrollments: {
        select: {
          id: true,
          status: true,
          amount: true,
          createdAt: true,
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}

export type UserDetailsType = Awaited<ReturnType<typeof getUserDetails>>;