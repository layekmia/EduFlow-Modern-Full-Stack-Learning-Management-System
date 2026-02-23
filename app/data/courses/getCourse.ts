import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function getCourse(slug: string) {

    const data = await prisma.course.findUnique({
        where: {
            slug
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
            category: true,
            description: true,
            chapter: {
                select: {
                    id: true,
                    title: true,
                    lessons: {
                        select: {
                            id: true,
                            title: true,
                        },
                        orderBy: { position: "asc" }
                    }
                },
                orderBy: {
                    position: 'asc'
                },
            },
        }
    });



    if (!data) {
        return notFound();
    }

    return data;
}

export type publicCoursesType = Awaited<ReturnType<typeof getCourse>>