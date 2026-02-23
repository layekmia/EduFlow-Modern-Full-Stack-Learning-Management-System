import prisma from "@/lib/prisma";

export async function getAllCourses() {

    const data = await prisma.course.findMany({
        where: {
            status: "Published"
        },
        select: {
            title: true,
            price: true,
            smallDescription: true,
            slug: true,
            fileKey: true,
            id: true,
            level: true,
            duration: true,
            category: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return data;
}

export type publicCoursesType = Awaited<ReturnType<typeof getAllCourses>>[0]