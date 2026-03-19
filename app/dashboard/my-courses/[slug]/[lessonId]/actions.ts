"use server"

import { generateCertificate } from "@/app/data/user/generate-certificate";
import { requireUser } from "@/app/data/user/require-user"
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

// Helper function to check if course is completed
async function isCourseCompleted(userId: string, courseId: string): Promise<boolean> {
    // Get all lessons in the course
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            chapter: {
                include: {
                    lessons: {
                        select: { id: true }
                    }
                }
            }
        }
    });

    if (!course) return false;

    // Get all lesson IDs in the course
    const allLessonIds = course.chapter.flatMap(ch =>
        ch.lessons.map(l => l.id)
    );

    // Count completed lessons
    const completedCount = await prisma.lessonProgress.count({
        where: {
            userId,
            lessonId: { in: allLessonIds },
            completed: true
        }
    });

    // Add 1 for the current lesson being completed
    const totalCompleted = completedCount + 1;
    const totalLessons = allLessonIds.length;

    return totalCompleted >= totalLessons;
}

export async function markLessonComplete(lessonId: string, slug: string): Promise<ApiResponse> {
    const user = await requireUser();

    try {
        // First, get the course ID from the lesson
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
            select: {
                chapter: {
                    select: {
                        courseId: true
                    }
                }
            }
        });

        if (!lesson) {
            return {
                status: "error",
                message: "Lesson not found"
            };
        }

        const courseId = lesson.chapter.courseId;

        // Mark the lesson as complete
        await prisma.lessonProgress.upsert({
            where: {
                userId_lessonId: {
                    userId: user.id,
                    lessonId
                },
            },
            update: {
                completed: true,
            },
            create: {
                lessonId,
                userId: user.id,
                completed: true
            }
        });

        // Check if this was the last lesson (course completion)
        const courseCompleted = await isCourseCompleted(user.id, courseId);

        // If course is completed, generate certificate
        if (courseCompleted) {
            try {
                await generateCertificate(courseId);
                console.log(`✅ Certificate generated for user ${user.id}, course ${courseId}`);
            } catch (certError) {
                // Log but don't fail the main operation
                console.error("Certificate generation failed:", certError);
            }
        }

        revalidatePath(`/dashboard/${slug}`);

        return {
            status: "success",
            message: courseCompleted
                ? "🎉 Congratulations! You've completed the course and earned a certificate."
                : "Progress updated successfully.",
        };

    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Failed to mark lesson complete"
        };
    }
}