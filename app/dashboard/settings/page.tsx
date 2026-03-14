import { getUserSettings } from "@/app/data/user/get-user-settings-data";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import SettingsTabs from "./_components/SettingsTabs";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings, profile, and preferences",
};

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  const settingsData = await getUserSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <SettingsTabs settingsData={settingsData} user={session?.user} />
        </div>
      </div>
    </div>
  );
}
