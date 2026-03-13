import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { env } from "@/lib/env";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
        return new Response("Missing stripe signature", { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Webhook signature error:", error);
        return new Response("Webhook Error", { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const enrollmentId = session.metadata?.enrollmentId;

                if (!enrollmentId) {
                    return new Response("Missing enrollmentId", { status: 400 });
                }

                const paymentIntentId =
                    typeof session.payment_intent === "string"
                        ? session.payment_intent
                        : session.payment_intent?.id;

                let chargeId: string | null = null;
                let receiptUrl: string | null = null;

                if (paymentIntentId) {
                    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
                        expand: ["latest_charge"],
                    });

                    const charge = paymentIntent.latest_charge as Stripe.Charge | null;

                    chargeId = charge?.id ?? null;
                    receiptUrl = charge?.receipt_url ?? null;

                    await prisma.enrollment.update({
                        where: { id: enrollmentId },
                        data: {
                            status: "Active",
                            amount: session.amount_total ?? 0,
                            stripePaymentIntentId: paymentIntent.id,
                            stripeChargeId: chargeId,
                            stripeReceiptUrl: receiptUrl,
                        },
                    });
                } else {
                    await prisma.enrollment.update({
                        where: { id: enrollmentId },
                        data: {
                            status: "Active",
                            amount: session.amount_total ?? 0,
                        },
                    });
                }

                break;
            }

            case "invoice.finalized":
            case "invoice.paid": {
                const invoice = event.data.object as Stripe.Invoice;
                const enrollmentId = invoice.metadata?.enrollmentId;

                if (!enrollmentId) {
                    break;
                }

                await prisma.enrollment.update({
                    where: { id: enrollmentId },
                    data: {
                        stripeInvoiceId: invoice.id,
                        stripeInvoiceUrl: invoice.hosted_invoice_url ?? null,
                        stripeInvoicePdf: invoice.invoice_pdf ?? null,
                    },
                });

                break;
            }

            default:
                break;
        }

        return new Response("OK", { status: 200 });
    } catch (error) {
        console.error("Webhook handler failed:", error);
        return new Response("Webhook handler failed", { status: 500 });
    }
}
