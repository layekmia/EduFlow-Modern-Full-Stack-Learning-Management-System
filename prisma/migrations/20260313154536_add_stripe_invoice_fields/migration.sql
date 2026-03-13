-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "stripeInvoiceId" TEXT,
ADD COLUMN     "stripeInvoicePdf" TEXT,
ADD COLUMN     "stripeInvoiceUrl" TEXT;
