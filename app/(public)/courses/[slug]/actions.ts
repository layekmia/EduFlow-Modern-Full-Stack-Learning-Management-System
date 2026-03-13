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
        select: { id: true, title: true, price: true, stripePriceId: true },
    });

    if (!course) {
        return { status: "error", message: "Course not found" };
    }

    if (!course.stripePriceId) {
        return { status: "error", message: "Stripe price not found for this course" };
    }

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

    const existingEnrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: user.id, courseId } },
        select: { id: true, status: true },
    });

    if (existingEnrollment?.status === "Active") {
        return { status: "error", message: "You are already enrolled in this course" };
    }

    const enrollment = existingEnrollment
        ? await prisma.enrollment.update({
            where: { id: existingEnrollment.id },
            data: { amount: course.price, status: "Pending" },
        })
        : await prisma.enrollment.create({
            data: {
                userId: user.id,
                courseId: course.id,
                amount: course.price,
                status: "Pending",
            },
        });

    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: "payment",
        line_items: [{ price: course.stripePriceId, quantity: 1 }],
        success_url: `${env.BETTER_AUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.BETTER_AUTH_URL}/payment/cancel`,
        metadata: {
            userId: user.id,
            courseId: course.id,
            enrollmentId: enrollment.id,
        },
        invoice_creation: {
            enabled: true,
            invoice_data: {
                metadata: {
                    userId: user.id,
                    courseId: course.id,
                    enrollmentId: enrollment.id,
                },
                description: `Invoice for course purchase: ${course.title}`,
            },
        },
    });

    if (!session.url) {
        return { status: "error", message: "Could not create checkout session" };
    }

    redirect(session.url);
}
