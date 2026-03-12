import prisma from "@/lib/prisma";
import { requireUser } from "./require-user";

export async function getUserSettings() {
    const user = await requireUser();

    const settingsData = await prisma.userSettings.findUnique({
        where: { userId: user.id }, select: {
            user: {
                select: {
                    name: true,
                    email: true,
                    id: true,
                }
            },
            phone: true,
            bio: true,
            location: true,
            website: true,

            emailNotifications: true,
            courseUpdates: true,
            newLessons: true,
            achievementAlerts: true,
            marketingEmails: true,
            weeklyDigest: true,
            reminderEmails: true,
            pushNotifications: true,

        }
    });

    return settingsData;
}