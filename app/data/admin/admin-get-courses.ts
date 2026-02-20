import prisma from "@/lib/prisma";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export async function adminGetCourses() {
    await requireAdmin();

    const data = await prisma.course.findMany({
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            title: true,
            smallDescription: true,
            duration: true,
            level: true,
            status: true,
            price: true,
            fileKey: true,
            slug: true
        }
    })

    return data;
}

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourses>>[0]

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

    if(!data){
        return notFound()
    }

    return data;
}