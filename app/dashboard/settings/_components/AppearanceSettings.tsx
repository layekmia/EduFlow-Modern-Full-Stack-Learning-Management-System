// app/dashboard/settings/_components/AppearanceSettings.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";
import { Monitor, Moon, Sun, Palette } from "lucide-react";

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState("medium");
  const [compactMode, setCompactMode] = useState(false);

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const fontSizes = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  const handleSave = () => {
    toast.success("Appearance settings saved");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Palette className="h-6 w-6 text-primary" />
          Appearance
        </CardTitle>
        <CardDescription>
          Customize how the platform looks and feels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Selection */}
        <div className="space-y-3">
          <Label>Theme</Label>
          <RadioGroup
            value={theme}
            onValueChange={setTheme}
            className="grid grid-cols-3 gap-4"
          >
            {themes.map((t) => (
              <Label
                key={t.value}
                htmlFor={t.value}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <RadioGroupItem
                  value={t.value}
                  id={t.value}
                  className="sr-only"
                />
                <t.icon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">{t.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Font Size */}
        <div className="space-y-3">
          <Label>Font Size</Label>
          <RadioGroup
            value={fontSize}
            onValueChange={setFontSize}
            className="flex gap-4"
          >
            {fontSizes.map((size) => (
              <div key={size.value} className="flex items-center space-x-2">
                <RadioGroupItem value={size.value} id={size.value} />
                <Label htmlFor={size.value}>{size.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Compact Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Compact Mode</Label>
            <p className="text-sm text-muted-foreground">
              Reduce spacing between elements for a denser layout
            </p>
          </div>
          <Button
            variant={compactMode ? "default" : "outline"}
            onClick={() => setCompactMode(!compactMode)}
            className="w-20"
          >
            {compactMode ? "On" : "Off"}
          </Button>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Appearance
        </Button>
      </CardContent>
    </Card>
  );
}