// app/admin/users/[userId]/_components/UserProfile.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, MapPin, Globe, Phone } from "lucide-react";
import { UserDetailsType } from "@/app/data/admin/get-user-details";

interface UserProfileProps {
  user: UserDetailsType;
}

export default function UserProfile({ user }: UserProfileProps) {
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
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar and Basic Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary/20">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                {user.role}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Joined{" "}
                {user.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
          {user.settings?.phone && (
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{user.settings.phone}</span>
            </div>
          )}
          {user.settings?.location && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{user.settings.location}</span>
            </div>
          )}
          {user.settings?.website && (
            <div className="flex items-center gap-3 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a
                href={user.settings.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {user.settings.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>

        {/* Bio */}
        {user.settings?.bio && (
          <div>
            <h3 className="text-sm font-medium mb-2">Bio</h3>
            <p className="text-sm text-muted-foreground">{user.settings.bio}</p>
          </div>
        )}

        {/* Settings Summary */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {user.settings?.emailNotifications && (
              <Badge variant="outline">Email Notifications</Badge>
            )}
            {user.settings?.pushNotifications && (
              <Badge variant="outline">Push Notifications</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
