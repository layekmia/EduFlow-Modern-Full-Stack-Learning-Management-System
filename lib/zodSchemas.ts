import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archive"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "It & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),

  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long" }),

  fileKey: z.string().min(1, { message: "File is required" }),

  price: z.coerce.number().min(1, { message: "Price must be at least 1" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hour" }),

  level: z.enum(courseLevels, { message: "level is required" }),

  category: z.enum(courseCategories, { message: "category is required" }),

  smallDescription: z
    .string()
    .min(3, { message: "Small description must be at least 3 characters" })
    .max(200, { message: "Small description must be at most 200 characters" }),

  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" }),

  status: z.enum(courseStatus, { message: "Status is required" }),
});

export type courseSchemaType = z.infer<typeof courseSchema>;
