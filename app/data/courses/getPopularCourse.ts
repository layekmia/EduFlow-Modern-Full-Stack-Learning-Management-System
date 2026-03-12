import prisma from "@/lib/prisma";

export async function getPopularCourse() {
    const data = await prisma.course.findMany({
        where: {
            status: "Published",
        },
        select: {
            id: true,
            title: true,
            price: true,
            smallDescription: true,
            slug: true,
            fileKey: true,
            level: true,
            duration: true,
            category: true,
            createdAt: true,
            _count: {
                select: {
                    enrollments: true,
                },
            },
        },
        orderBy: [
            {
                enrollments: {
                    _count: "desc",
                },
            },
            {
                createdAt: "desc",
            },
        ],
    });

    return data;
}

export type PopularCourseType = Awaited<
    ReturnType<typeof getPopularCourse>
>[0];