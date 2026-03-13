import { PaymentHistoryType } from "@/app/data/user/get-payment-history";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatAmountWithSymbol } from "@/utils/helper";
import { Download, ExternalLink, FileText, History } from "lucide-react";
import Link from "next/link";

interface BillingSettingsProps {
  payments: PaymentHistoryType;
}

export default function BillingSettings({ payments }: BillingSettingsProps) {
  if (payments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Payment History
          </CardTitle>
          <CardDescription>
            View your past transactions and download invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No payment history yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Payment History
        </CardTitle>
        <CardDescription>
          View your past transactions and download invoices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id}>
              <div className="flex flex-col gap-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{payment.course.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {payment.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <span className="font-semibold">
                    {formatAmountWithSymbol(payment.amount)}
                  </span>

                  <Badge
                    variant={
                      payment.status === "Active" ? "default" : "secondary"
                    }
                    className="capitalize"
                  >
                    {payment.status === "Active" ? "Paid" : payment.status}
                  </Badge>

                  {payment.stripeInvoicePdf ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {payment.stripeInvoiceUrl && (
                        <Button size="sm" asChild>
                          <Link
                            href={payment.stripeInvoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="size-4" />
                            Download Invoice
                          </Link>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Receipt not available
                    </span>
                  )}
                </div>
              </div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
