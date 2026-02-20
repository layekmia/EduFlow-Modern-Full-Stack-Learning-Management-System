"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { courseSchema, courseSchemaType } from "@/lib/zodSchemas";



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