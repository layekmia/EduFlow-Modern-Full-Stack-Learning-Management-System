import { getAllUsers } from "@/app/data/admin/get-all-users";
import UsersTable from "./_components/UsersTable";
import UsersHeader from "./_components/UsersHeader";

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const { page = "1" } = await searchParams;

  const { users, totalCount, currentPage, totalPages } = await getAllUsers({
    page: parseInt(page),
    limit: 10,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      <UsersHeader />

      <div className="container mx-auto md:px-4">
        <div className="max-w-7xl mx-auto">
          <UsersTable
            users={users}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
          />
        </div>
      </div>
    </div>
  );
}
