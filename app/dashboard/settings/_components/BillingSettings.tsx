"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Download, History, Plus } from "lucide-react";

interface BillingSettingsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settingsData: any;
}

export default function BillingSettings({
  user,
  settingsData,
}: BillingSettingsProps) {
  const payments = [
    {
      id: 1,
      course: "JavaScript Mastery",
      date: "Mar 10, 2024",
      amount: "$49.99",
      status: "Paid",
    },
    {
      id: 2,
      course: "React Complete Guide",
      date: "Feb 28, 2024",
      amount: "$59.99",
      status: "Paid",
    },
    {
      id: 3,
      course: "Node.js Advanced",
      date: "Feb 15, 2024",
      amount: "$39.99",
      status: "Paid",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Methods
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Method
            </Button>
          </CardTitle>
          <CardDescription>
            Manage your payment methods for purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Badge>Default</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Mastercard ending in 8888</p>
                  <p className="text-sm text-muted-foreground">Expires 06/24</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Payment History
          </CardTitle>
          <CardDescription>
            View your past transactions and download receipts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id}>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">{payment.course}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">{payment.amount}</span>
                    <Badge variant="outline">{payment.status}</Badge>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
