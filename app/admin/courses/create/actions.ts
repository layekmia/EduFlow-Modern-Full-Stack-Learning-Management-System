"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
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

    const data = await stripe.products.create({
      name: validation.data.title,
      description: validation.data.smallDescription,
      default_price_data: {
        currency: "usd",
        unit_amount: validation.data.price * 100,
      }
    })

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session.user.id,
        stripePriceId: data.default_price as string,
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
