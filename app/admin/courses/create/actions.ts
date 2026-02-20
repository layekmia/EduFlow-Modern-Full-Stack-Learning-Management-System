"use server";

import { requireAdmin } from "@/app/data/admin/requre-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { courseSchema, courseSchemaType } from "@/lib/zodSchemas";

export async function CreateCourse(
  values: courseSchemaType,
): Promise<ApiResponse> {
  const session = await requireAdmin();
  try {

    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: validation.error.errors[0]?.message || "Invalid form data.",
      };
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session.user.id,
      },
    });

    return {
      status: "success",
      message: "Course created successfully.",
    };
  } catch (error) {
    console.error("CreateCourse Error:", error); // log internally

    return {
      status: "error",
      message: "An unexpected error occurred",
    };
  }
}
