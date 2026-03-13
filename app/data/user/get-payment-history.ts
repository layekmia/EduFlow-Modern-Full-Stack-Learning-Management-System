import prisma from "@/lib/prisma";
import { requireUser } from "./require-user";

export async function getPaymentHistory() {
    const user = await requireUser();

    const payments = await prisma.enrollment.findMany({
        where: { userId: user.id },
        select: {
            id: true,
            amount: true,
            status: true,

            stripePaymentIntentId: true,
            stripeChargeId: true,
            stripeReceiptUrl: true,

            stripeInvoiceId: true,
            stripeInvoiceUrl: true,
            stripeInvoicePdf: true,

            course: {
                select: {
                    title: true,
                },
            },

            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return payments;
}

export type PaymentHistoryType = Awaited<ReturnType<typeof getPaymentHistory>>;
