import { getPaymentHistory } from "@/app/data/user/get-payment-history";
import BillingSettings from "./_components/BillingSettings";
import BillingOverview from "./_components/OverView";

export default async function BillingsPage() {
  const payments = await getPaymentHistory();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 mb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Billing & Payments
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your payment methods, view invoices, and track your
              spending
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <BillingOverview payments={payments} />
        <BillingSettings payments={payments} />
      </div>
    </div>
  );
}
