"use server";

import { requireUser } from "@/app/data/user/require-user";
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import axios from "axios";
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


interface AvatarApiResponse {
    status: "error" | "success"
    message: string
    url?: string
}

export async function updateAvatarImage(formData: FormData): Promise<AvatarApiResponse> {
    const user = await requireUser();

    try {
        const file = formData.get("avatar") as File;

        if (!file) {
            return { status: "error", message: "No file provided" }
        }

        if (!file.type.startsWith("image/")) {
            return { status: "error", message: "File must be an image" }
        }

        if (file.size > 2 * 1024 * 1024) {
            return { status: "error", message: "file size must be less then 2MB" }
        }

        const fileExtension = file.type.split("/")[1];
        const fileName = `avatar/${user.id}/${Date.now()}.${fileExtension}`;

        const fileData = {
            fileName,
            contentType: file.type,
            size: file.size,
            isImage: true,
        }

        const presignedResponse = await axios.post(`${env.BETTER_AUTH_URL}/api/s3/avatar/upload`, fileData, {
            headers: {
                'Content-Type': "application/json"
            }
        });

        const { presignedUrl, key } = presignedResponse.data;


        await axios.put(presignedUrl, file, {
            headers: {
                "Content-Type": file.type,
            }
        });

        const imageUrl = `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.t3.storage.dev/${key}`

        await prisma.user.update({ where: { id: user.id }, data: { image: imageUrl } })


        revalidatePath("/dashboard/settings");

        console.log("Success")

        return { status: "success", message: "successfully updated the avatar image", url: imageUrl }
    } catch {
        return { status: "error", message: "Failed to update the avatar image" }
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