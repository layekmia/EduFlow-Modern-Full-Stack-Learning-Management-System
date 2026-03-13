/*
  Warnings:

  - You are about to drop the column `stripeInvoiceId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `stripeInvoicePdf` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `stripeInvoiceUrl` on the `Enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "stripeInvoiceId",
DROP COLUMN "stripeInvoicePdf",
DROP COLUMN "stripeInvoiceUrl",
ADD COLUMN     "stripeChargeId" TEXT,
ADD COLUMN     "stripePaymentIntentId" TEXT,
ADD COLUMN     "stripeReceiptUrl" TEXT;
