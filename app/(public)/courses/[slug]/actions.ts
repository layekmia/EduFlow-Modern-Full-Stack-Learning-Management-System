"use server";

import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { requireUser } from "@/app/data/user/require-user";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";

export async function enrollInCourseAction(courseId: string): Promise<ApiResponse> {
    const user = await requireUser();

    const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: { id: true, title: true, price: true, slug: true },
    });

    if (!course) return { status: "error", message: "Course not found" };

    // ensure stripe customer
    const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { stripeCustomerId: true, email: true, name: true },
    });

    let stripeCustomerId = dbUser?.stripeCustomerId;

    if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
            email: user.email ?? undefined,
            name: user.name ?? undefined,
            metadata: { userId: user.id },
        });

        stripeCustomerId = customer.id;

        await prisma.user.update({
            where: { id: user.id },
            data: { stripeCustomerId },
        });
    }

    const result = await prisma.$transaction(async (tx) => {
        const existing = await tx.enrollment.findUnique({
            where: { userId_courseId: { userId: user.id, courseId } },
            select: { id: true, status: true },
        });

        if (existing?.status === "Active") {
            return { ok: false as const, message: "You are already enrolled" };
        }

        const enrollment = existing
            ? await tx.enrollment.update({
                where: { id: existing.id },
                data: { amount: course.price, status: "Pending" },
            })
            : await tx.enrollment.create({
                data: { userId: user.id, courseId: course.id, amount: course.price, status: "Pending" },
            });

        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId!,
            line_items: [{ price: "price_1T5qZhCgLpByogJcSmd7lk4O", quantity: 1 }],
            mode: "payment",
            success_url: `${env.BETTER_AUTH_URL}/payment/success`,
            cancel_url: `${env.BETTER_AUTH_URL}/payment/cancel`,
            metadata: {
                userId: user.id,
                courseId: course.id,
                enrollmentId: enrollment.id,
            },
        });

        return { ok: true as const, checkoutUrl: session.url! };
    });

    if (!result.ok) return { status: "error", message: result.message };

    redirect(result.checkoutUrl);
}