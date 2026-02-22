"use server"

import { requireAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { lessonSchema, lessonSchemaType } from "@/lib/zodSchemas";

interface iAppProps {
    data: lessonSchemaType,
    lessonId: string,
}

export async function updateLesson({ data, lessonId }: iAppProps): Promise<ApiResponse> {
    await requireAdmin();

    try {
        const result = lessonSchema.safeParse(data);

        if (!result) {
            return {
                status: "error",
                message: "Invalid data"
            }
        }

        await prisma.lesson.update({
            where: { id: lessonId },
            data: {
                title: result.data?.title,
                description: result.data?.description,
                thumbnailKey: result.data?.thumbnailKey,
                videoKey: result.data?.videoKey,
                chapterId: result.data?.chapterId,
            }
        })

        return { status: "success", message: "Successfully updated the lesson" }
    } catch {
        return {
            status: "error",
            message: "Failed to update lesson"
        }
    }

}