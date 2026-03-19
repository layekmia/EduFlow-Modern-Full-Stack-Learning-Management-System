
import prisma from "@/lib/prisma";

interface GetAllCoursesParams {
    search?: string;
}

export async function getAllCourses({ search = "" }: GetAllCoursesParams = {}) {

    // Build where clause with search
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
        status: "Published",
    };

    // Add search filter if search term exists
    if (search) {
        where.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { smallDescription: { contains: search, mode: "insensitive" } },
            { category: { contains: search, mode: "insensitive" } },
        ];
    }

    const data = await prisma.course.findMany({
        where,
        select: {
            title: true,
            price: true,
            smallDescription: true,
            slug: true,
            fileKey: true,
            id: true,
            level: true,
            duration: true,
            category: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return data;
}

export type publicCoursesType = Awaited<ReturnType<typeof getAllCourses>>[number];