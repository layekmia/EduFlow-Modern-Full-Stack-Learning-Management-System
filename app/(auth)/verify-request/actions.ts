"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"

export async function updateUserNameDuringSignUp(name: string): Promise<ApiResponse> {
    try {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session?.user) {
            return { status: "error", message: "Unauthorized" }
        }
        if (!name || name.trim().length === 0) {
            return { status: "error", message: "Name is required" };
        }
        await prisma.user.update({ where: { id: session.user.id }, data: { name } });

        revalidatePath("/");
        revalidatePath("/dashboard");

        return { status: "success", message: "successfully updated user name" }
    } catch {
        return { status: "error", message: "UnExpected error" }
    }
}