"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { courseSchema, courseSchemaType } from "@/lib/zodSchemas";
import { headers } from "next/headers";

export async function CreateCourse(
  values: courseSchemaType,
): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
      return {
        status: "error",
        message: "You must be logged in to create a course.",
      };
    }

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
      message: "Something went wrong. Please try again.",
    };
  }
}
