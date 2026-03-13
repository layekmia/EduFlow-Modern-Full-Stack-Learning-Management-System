import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, DollarSign, Receipt, TrendingUp } from "lucide-react";
import { formatAmountWithSymbol } from "@/utils/helper";
import { PaymentHistoryType } from "@/app/data/user/get-payment-history";

interface BillingOverviewProps {
  payments: PaymentHistoryType;
}

export default function BillingOverview({ payments }: BillingOverviewProps) {
  const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidCount = payments.filter((p) => p.status === "Active").length;
  const lastPayment = payments[0];

  const stats = [
    {
      title: "Total Spent",
      value: formatAmountWithSymbol(totalSpent),
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Transactions",
      value: payments.length,
      icon: Receipt,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Paid Courses",
      value: paidCount,
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Last Payment",
      value: lastPayment ? formatAmountWithSymbol(lastPayment.amount) : "$0",
      icon: CreditCard,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
