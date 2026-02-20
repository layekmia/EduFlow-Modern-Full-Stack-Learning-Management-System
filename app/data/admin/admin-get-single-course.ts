import { notFound } from "next/navigation";
import { requireAdmin } from "./require-admin";
import prisma from "@/lib/prisma";

export async function adminGetCourse(id: string) {
    await requireAdmin();

    const data = await prisma.course.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            smallDescription: true,
            description: true,
            duration: true,
            level: true,
            status: true,
            price: true,
            fileKey: true,
            slug: true,
            category: true,
        }
    })

    if (!data) {
        return notFound()
    }

    return data;
}
export type AdminCourseSingularType = Awaited<ReturnType<typeof adminGetCourse>>