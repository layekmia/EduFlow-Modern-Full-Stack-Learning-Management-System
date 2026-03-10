"use server"

import prisma from "@/lib/prisma";

export async function checkEmail(email: string) {
    try {
        if (!email) {
            return {
                status: "error",
                message: "Email is required",
            };
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: {
                id: true,
                email: true
            },
        });

        if (!user) {
            return {
                status: "not_found",
                message: "No account found with this email",
            };
        }

        return {
            status: "user_found",
            message: "User found",
        };
    } catch (error) {
        return {
            status: "error",
            message: "Something went wrong",
        };
    }
}