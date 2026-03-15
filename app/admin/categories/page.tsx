import { Metadata } from "next";
import { Suspense } from "react";

import { getCategories } from "@/app/data/admin/get-categories";
import CategoriesHeader from "./_components/CategoriesHeader";
import CreateCategoryDialog from "./_components/CreateCategoryDialog";
import CategoriesLoading from "./loading";
import CategoriesTable from "./_components/CategoriesTable";

export const metadata: Metadata = {
  title: "Categories",
  description: "Manage course categories",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const { categories, totalCount } = await getCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      <CategoriesHeader />

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <CreateCategoryDialog />
          </div>

          {/* Categories Table */}
          <Suspense fallback={<CategoriesLoading />}>
            <CategoriesTable categories={categories} totalCount={totalCount} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
