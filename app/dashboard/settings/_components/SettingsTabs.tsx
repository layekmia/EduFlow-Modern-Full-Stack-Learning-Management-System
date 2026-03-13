"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Palette, User } from "lucide-react";
import AppearanceSettings from "./AppearanceSettings";
import NotificationSettings from "./NotificationSettings";
import ProfileSettings from "./ProfileSettings";

interface SettingsTabsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settingsData: any;
}

export default function SettingsTabs({
  user,
  settingsData,
}: SettingsTabsProps) {
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-transparent h-auto p-0 mb-12 md:mb-6 w-full">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="flex items-center gap-2 px-3 py-2 data-[state=active]:bg-primary dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground data-[state=active]:text-primary-foreground bg-muted text-muted-foreground hover:bg-muted/80 transition-all"
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden md:inline">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="profile">
        <ProfileSettings user={user} settingsData={settingsData} />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationSettings settingsData={settingsData} />
      </TabsContent>

      <TabsContent value="appearance">
        <AppearanceSettings />
      </TabsContent>
    </Tabs>
  );
}
