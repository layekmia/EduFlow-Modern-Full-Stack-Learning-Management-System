import prisma from "@/lib/prisma";
import { requireAdmin } from "./require-admin";

export async function getCategories() {
    await requireAdmin();



    const [categories, totalCount] = await Promise.all([
        prisma.category.findMany({
            orderBy: {
                name: "asc",
            },

        }),
        prisma.category.count({}),
    ]);

    return {
        categories,
        totalCount,

    };
}

export type CategoryType = Awaited<ReturnType<typeof getCategories>>['categories'][0]