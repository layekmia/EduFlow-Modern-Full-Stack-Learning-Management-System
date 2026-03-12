// app/dashboard/settings/_components/NotificationSettings.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Award, Bell, BookOpen, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface NotificationSettingsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settingsData: any;
}

export default function NotificationSettings({
  user,
  settingsData,
}: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    emailNotifications: settingsData?.emailNotifications ?? true,
    courseUpdates: settingsData?.courseUpdates ?? true,
    newLessons: settingsData?.newLessons ?? true,
    achievementAlerts: settingsData?.achievementAlerts ?? true,
    marketingEmails: settingsData?.marketingEmails ?? false,
    weeklyDigest: settingsData?.weeklyDigest ?? true,
    reminderEmails: settingsData?.reminderEmails ?? true,
    pushNotifications: settingsData?.pushNotifications ?? false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save settings to database
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Notification preferences updated");
    } catch (error) {
      toast.error("Failed to update preferences");
    } finally {
      setIsLoading(false);
    }
  };

  const notificationGroups = [
    {
      title: "Email Notifications",
      icon: Mail,
      items: [
        {
          key: "emailNotifications",
          label: "Enable Email Notifications",
          description: "Receive notifications via email",
        },
        {
          key: "weeklyDigest",
          label: "Weekly Digest",
          description: "Get a weekly summary of your progress",
        },
        {
          key: "marketingEmails",
          label: "Marketing Emails",
          description: "Receive updates about new courses and features",
        },
      ],
    },
    {
      title: "Course Updates",
      icon: BookOpen,
      items: [
        {
          key: "courseUpdates",
          label: "Course Updates",
          description:
            "Get notified when courses you're enrolled in are updated",
        },
        {
          key: "newLessons",
          label: "New Lessons",
          description: "Notifications when new lessons are added",
        },
        {
          key: "reminderEmails",
          label: "Reminder Emails",
          description: "Reminders to continue your learning journey",
        },
      ],
    },
    {
      title: "Achievements",
      icon: Award,
      items: [
        {
          key: "achievementAlerts",
          label: "Achievement Alerts",
          description: "Get notified when you earn badges or certificates",
        },
      ],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Choose how and when you want to be notified
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {notificationGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {groupIndex > 0 && <Separator className="my-6" />}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <group.icon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{group.title}</h3>
              </div>
              <div className="space-y-4 pl-7">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={item.key}>{item.label}</Label>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      id={item.key}
                      checked={settings[item.key as keyof typeof settings]}
                      onCheckedChange={() =>
                        handleToggle(item.key as keyof typeof settings)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <Label htmlFor="pushNotifications">Push Notifications</Label>
            </div>
            <p className="text-sm text-muted-foreground pl-7">
              Receive instant notifications in your browser
            </p>
          </div>
          <Switch
            id="pushNotifications"
            checked={settings.pushNotifications}
            onCheckedChange={() => handleToggle("pushNotifications")}
          />
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </CardFooter>
    </Card>
  );
}
