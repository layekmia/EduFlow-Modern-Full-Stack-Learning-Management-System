"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";

export async function deleteUser(userId: string): Promise<ApiResponse> {
    await requireAdmin();

    try {
        await prisma.user.delete({
            where: { id: userId }
        });

        return {
            status: "success",
            message: "User successfully deleted"
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // Check if error is because user not found
        if (error.code === 'P2025') {
            return {
                status: "error",
                message: "User not found or already deleted"
            };
        }

        // Other errors
        console.error("Delete user error:", error);
        return {
            status: "error",
            message: "Failed to delete user"
        };
    }
}