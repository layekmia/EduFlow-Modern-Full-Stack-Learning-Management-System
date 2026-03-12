"use server"

import { requireUser } from "@/app/data/user/require-user"
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";


export async function markLessonComplete(lessonId: string, slug: string): Promise<ApiResponse> {
    const user = await requireUser();

    try {

        await prisma.lessonProgress.upsert({
            where: {
                userId_lessonId: {
                    userId: user.id,
                    lessonId
                },
            },
            update: {
                completed: true,
            },
            create: {
                lessonId,
                userId: user.id,
                completed: true
            }
        })

        revalidatePath(`/dashboard/${slug}`)

        return {
            status: "success",
            message: "Progress Updated"
        }


    } catch (error) {
        console.log(error)
        return {
            status: "error",
            message: "failed to mark lesson complete"
        }
    }
}