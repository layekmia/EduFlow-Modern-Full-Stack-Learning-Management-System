"use server";

import { requireUser } from "@/app/data/user/require-user";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";



export async function updateProfileSettings(formData: FormData): Promise<ApiResponse> {
    const user = await requireUser();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;
    const bio = formData.get("bio") as string;

    try {

        await Promise.all([
            prisma.user.update({
                where: { id: user.id },
                data: { name, email }
            }),
            prisma.userSettings.update({
                where: { userId: user.id },
                data: { phone, location, bio }
            })
        ]);

        revalidatePath("/dashboard/settings");
        return {
            status: "success",
            message: "Profile updated successfully"
        };

    } catch (error) {
        console.error("Profile update error:", error);
        return {
            status: "error",
            message: "Failed to update profile"
        };
    }
}




const notificationSchema = z.object({
    emailNotifications: z.boolean(),
    courseUpdates: z.boolean(),
    newLessons: z.boolean(),
    achievementAlerts: z.boolean(),
    marketingEmails: z.boolean(),
    weeklyDigest: z.boolean(),
    reminderEmails: z.boolean(),
    pushNotifications: z.boolean(),
});

export async function updateNotificationSettings(formData: FormData): Promise<ApiResponse> {
    try {
        const user = await requireUser();

        // Parse form data
        const settings = {
            emailNotifications: formData.get("emailNotifications") === "true",
            courseUpdates: formData.get("courseUpdates") === "true",
            newLessons: formData.get("newLessons") === "true",
            achievementAlerts: formData.get("achievementAlerts") === "true",
            marketingEmails: formData.get("marketingEmails") === "true",
            weeklyDigest: formData.get("weeklyDigest") === "true",
            reminderEmails: formData.get("reminderEmails") === "true",
            pushNotifications: formData.get("pushNotifications") === "true",
        };

        // Validate
        notificationSchema.parse(settings);

        // Update database
        await prisma.userSettings.update({
            where: { userId: user.id },
            data: settings,
        });

        revalidatePath("/dashboard/settings");

        return {
            status: "success",
            message: "Notification preferences updated"
        };

    } catch (error) {
        console.error("Failed to update notification settings:", error);
        return {
            status: "error",
            message: "Failed to update preferences"
        };
    }
}