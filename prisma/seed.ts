import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

const courseId = "036233f0-d80b-4623-9a51-272c3f116b8e";

async function main() {
    await prisma.chapter.create({
        data: {
            title: "Getting Started",
            position: 1,
            courseId: courseId,
            lessons: {
                create: [
                    {
                        title: "Welcome to the Course",
                        description: "Course introduction",
                        position: 1,
                    },
                    {
                        title: "Setup Development Environment",
                        description: "Install Node and tools",
                        position: 2,
                    },
                    {
                        title: "Project Overview",
                        description: "Understand the project structure",
                        position: 3,
                    },
                ],
            },
        },
    });

    await prisma.chapter.create({
        data: {
            title: "Core Concepts",
            position: 2,
            courseId: courseId,
            lessons: {
                create: [
                    {
                        title: "Understanding the Basics",
                        description: "Learn the fundamentals",
                        position: 1,
                    },
                    {
                        title: "Working with Data",
                        description: "Handling data properly",
                        position: 2,
                    },
                    {
                        title: "Building the First Feature",
                        description: "Create your first feature",
                        position: 3,
                    },
                ],
            },
        },
    });

    console.log("✅ Chapters and Lessons seeded successfully");
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });