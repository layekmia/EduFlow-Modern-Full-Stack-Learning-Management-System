import prisma from "@/lib/prisma";
import { requireAdmin } from "./require-admin";

interface GetAllUsersParams {
    page?: number;
    limit?: number;
    search?: string;
}

export async function getAllUsers({
    page = 1,
    limit = 10,
}: GetAllUsersParams = {}) {
    await requireAdmin();

    const skip = (page - 1) * limit;

    // Get users with pagination
    const [users, totalCount] = await Promise.all([
        prisma.user.findMany({
            where: { role: "USER" },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                createdAt: true,
                _count: {
                    select: {
                        courses: true,
                        enrollments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma.user.count({ where: { role: "USER" } }),
    ]);

    return {
        users,
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
    };
}

export type UserType = Awaited<ReturnType<typeof getAllUsers>>["users"][number];