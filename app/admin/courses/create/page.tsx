import { getCategories } from "@/app/data/admin/get-categories";
import CourseCreationPage from "./CreateForm";

export default async function page() {
  const categories = await getCategories();

  return <CourseCreationPage categories={categories.categories} />;
}
