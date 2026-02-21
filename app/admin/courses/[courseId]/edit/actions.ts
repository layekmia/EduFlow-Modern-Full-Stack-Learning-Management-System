"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { courseSchema, courseSchemaType } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";



export async function editCourse(values: courseSchemaType, courseId: string): Promise<ApiResponse> {
    await requireAdmin();

    try {
        const result = courseSchema.safeParse(values);


        if (!result) {
            return {
                status: "error",
                message: "Invalid data"
            }
        }

        await prisma.course.update({
            where: {
                id: courseId
            },
            data: {
                ...result.data
            }
        })


        return {
            status: "success",
            message: "successfully update course"
        }
    } catch (err) {
        console.log(err)
        return {
            status: "error",
            message: "An unexpected error occurred"
        }
    }

}

export async function reorderLessonsInDb(
    chapterId: string,
    lessons: { id: string, position: number }[],
    courseId: string
): Promise<ApiResponse> {
    await requireAdmin();
    try {

        if (!lessons || lessons.length === 0) {
            return {
                status: "error",
                message: "No lessons provided for reordering"
            }
        }

        const updates = lessons.map((lesson) =>
            prisma.lesson.update({
                where: {
                    id: lesson.id,
                    chapterId
                },
                data: {
                    position: lesson.position,
                }
            })
        )

        await prisma.$transaction(updates);

        revalidatePath(`/admin/courses/${courseId}/edit`)

        return { status: "success", message: "successfully reorder the lessons" }
    } catch {
        return {
            status: "error",
            message: "Failed to reorder lessons"
        }
    }

}

export async function reorderChaptersInDb(courseId: string, chapters: { id: string; position: number }[]): Promise<ApiResponse> {

    await requireAdmin();

    try {
        if (!chapters || !chapters.length) {
            return {
                status: "error",
                message: "No chapters provided for reordering"
            }
        }

        const updates = chapters.map((chapter) =>
            prisma.chapter.update({
                where: { id: chapter.id, courseId },
                data: {
                    position: chapter.position
                }
            })
        )

        await prisma.$transaction(updates);

        revalidatePath(`/admin/courses/${courseId}/edit`)

        return {
            status: "success",
            message: "Chapters reorder successfully"
        }
    } catch {
        return { status: "error", message: "Failed to reorder chapters" }
    }
}