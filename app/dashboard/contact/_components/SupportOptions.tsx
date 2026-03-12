import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Mail, MessageCircle } from "lucide-react";

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start Chat",
    href: "#",
    available: "24/7",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email",
    action: "support@eduflow.com",
    href: "mailto:support@eduflow.com",
    available: "Within 24h",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description: "Browse helpful articles",
    action: "View Guides",
    href: "/guides",
    available: "Self-service",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export default function SupportOptions() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Get in touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors group"
            >
              <div className={`p-2 rounded-full ${option.bg}`}>
                <option.icon className={`h-5 w-5 ${option.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{option.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {option.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-primary">{option.action}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {option.available}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
