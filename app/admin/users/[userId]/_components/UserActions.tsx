"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Ban, Mail, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteConfirmDialog } from "../../_components/DeleteConfirmDialog";
import { deleteUser } from "../../actions";

interface UserActionsProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function UserActions({ user }: UserActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteUser(user.id);
    setIsDeleting(false);

    if (result.status === "success") {
      toast.success(result.message);
      router.push("/admin/users");
    } else {
      toast.error(result.message);
    }
  };

  const actions = [
    {
      label: "Change Role",
      icon: Shield,
      onClick: () => toast.info("Role change coming soon"),
      variant: "outline" as const,
    },
    {
      label: "Send Email",
      icon: Mail,
      onClick: () => toast.info("Email send coming soon"),
      variant: "outline" as const,
    },
    {
      label: "Suspend User",
      icon: Ban,
      onClick: () => toast.info("Suspend feature coming soon"),
      variant: "outline" as const,
      className: "text-yellow-600 hover:text-yellow-700",
    },
    {
      label: "Delete User",
      icon: AlertTriangle,
      onClick: () => setShowDeleteDialog(true),
      variant: "outline" as const,
      className: "text-destructive hover:text-destructive",
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant}
              className={`w-full justify-start ${action.className || ""}`}
              onClick={action.onClick}
            >
              <action.icon className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete User"
        description="This action cannot be undone. This will permanently delete this user and all associated data including their courses, enrollments, and progress."
        itemName={user.name}
      />
    </>
  );
}
