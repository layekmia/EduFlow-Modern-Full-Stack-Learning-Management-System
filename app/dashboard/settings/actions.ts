"use server";

import { requireUser } from "@/app/data/user/require-user";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function updateProfile(formData: FormData) {
    try {
        const user = await requireUser();
        if (!user) throw new Error("Unauthorized");

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const bio = formData.get("bio") as string;
        const location = formData.get("location") as string;
        const phone = formData.get("phone") as string;

        await prisma.user.update({
            where: { id: user.id },
            data: {
                name,
                email,
                bio,
                location,
                phone
            },
        });

        revalidatePath("/dashboard/settings");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to update profile" };
    }
}


