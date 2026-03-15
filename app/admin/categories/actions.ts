"use server";


import { requireAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const categorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
});

export async function createCategory(formData: FormData): Promise<ApiResponse> {
    try {
        await requireAdmin();

        const data = {
            name: formData.get("name") as string,
            slug: (formData.get("name") as string)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
        };

        const validated = categorySchema.parse(data);

        await prisma.category.create({
            data: validated,
        });

        revalidatePath("/admin/categories");
        return { status: "success", message: "Category created successfully" };
    } catch (error) {
        console.error("Create category error:", error);
        return { status: "error", message: "Failed to create category" };
    }
}

export async function updateCategory(id: string, formData: FormData): Promise<ApiResponse> {
    try {
        await requireAdmin();

        const data = {
            name: formData.get("name") as string,
            slug: (formData.get("name") as string)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
        };

        const validated = categorySchema.parse(data);

        await prisma.category.update({
            where: { id },
            data: validated,
        });

        revalidatePath("/admin/categories");
        return { status: "success", message: "Category updated successfully" };
    } catch (error) {
        console.error("Update category error:", error);
        return { status: "error", message: "Failed to update category" };
    }
}

export async function deleteCategory(id: string): Promise<ApiResponse> {
    try {
        await requireAdmin();


        await prisma.category.delete({
            where: { id },
        });

        revalidatePath("/admin/categories");
        return { status: "success", message: "Category deleted successfully" };
    } catch (error) {
        console.error("Delete category error:", error);
        return { status: "error", message: "Failed to delete category" };
    }
}