import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserDetails } from "@/app/data/admin/get-user-details";
import UserProfile from "./_components/UserProfile";
import UserStats from "./_components/UserStats";
import UserCourses from "./_components/UserCourses";
import UserEnrollments from "./_components/UserEnrollments";
import UserActions from "./_components/UserActions";

interface PageProps {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { userId } = await params;
  const user = await getUserDetails(userId).catch(() => null);

  return {
    title: user ? `${user.name} | User Details` : "User Not Found",
    description: user
      ? `View details and activity for ${user.name}`
      : "User not found",
  };
}

export default async function UserDetailsPage({ params }: PageProps) {
  const { userId } = await params;

  const user = await getUserDetails(userId).catch(() => null);

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 mb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              User Details
            </h1>
            <p className="text-muted-foreground mt-2">
              View detailed information and activity for this user
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* User Profile & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <UserProfile user={user} />
            </div>
            <div className="lg:col-span-1">
              <UserActions user={user} />
            </div>
          </div>

          {/* Stats Cards */}
          <UserStats user={user} />

          {/* Two Column Layout for Courses and Enrollments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserCourses courses={user.courses} />
            <UserEnrollments enrollments={user.enrollments} />
          </div>
        </div>
      </div>
    </div>
  );
}
