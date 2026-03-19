"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateAvatarImage, updateProfileSettings } from "../actions";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(200, "Bio must be less than 200 characters").optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  location: z.string().optional(),
  phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileSettingsProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settingsData: any;
}

export default function ProfileSettings({
  user,
  settingsData,
}: ProfileSettingsProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.image || null,
  );

  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      bio: settingsData?.bio || "",
      location: settingsData?.location || "",
      phone: settingsData?.phone || "",
    },
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    // Clean up previous object URL
    if (avatarPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }

    // Create new preview
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);
    setAvatarFile(file);

    // Auto-upload the file
    setIsUploading(true);

    const uploadFormData = new FormData();
    uploadFormData.append("avatar", file);

    const result = await updateAvatarImage(uploadFormData);

    setIsUploading(false);

    if (result.status === "success") {
      toast.success(result.message);
      // Update preview with the actual URL from server
      setAvatarPreview(result.url ?? "");
      setAvatarFile(null);
      router.refresh();
    } else {
      toast.error(result.message);
      // Revert to previous avatar
      setAvatarPreview(user.image ?? null);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const result = await updateProfileSettings(formData);
      if (result.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and how others see you on the
          platform
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="h-20 w-20 border-2 border-primary/20 overflow-hidden">
                <AvatarImage
                  src={avatarPreview || ""}
                  className="object-cover w-full h-full" // Add this
                />
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
              >
                <Camera className="h-6 w-6 text-white" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isUploading}
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="John Doe"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="john@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="+880 17947-00000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="New York, USA"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                {...register("bio")}
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Tell us a little about yourself..."
              />
              {errors.bio && (
                <p className="text-xs text-red-500">{errors.bio.message}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
