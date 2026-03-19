"use server";

import { requireUser } from "@/app/data/user/require-user";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { generatePDFCertificate } from "./generate-certificate-pdflib";

export async function generateCertificate(courseId: string) {
    const user = await requireUser();

    // Check if certificate already exists
    const existing = await prisma.certificate.findUnique({
        where: {
            userId_courseId: {
                userId: user.id,
                courseId,
            },
        },
    });

    if (existing) {
        return { success: true, certificate: existing };
    }

    // Get course and user details
    const [course, userData] = await Promise.all([
        prisma.course.findUnique({
            where: { id: courseId },
            select: {
                title: true,
                duration: true,
                level: true,
                category: true,
                user: { select: { name: true } }, // instructor
            },
        }),
        prisma.user.findUnique({
            where: { id: user.id },
            select: { name: true, email: true },
        }),
    ]);

    if (!course || !userData) {
        throw new Error("Course or user not found");
    }

    // Generate unique certificate ID
    const certificateId = `CERT-${new Date().getFullYear()}-${Math.floor(
        Math.random() * 10000
    )
        .toString()
        .padStart(4, "0")}`;

    // Generate PDF using pdf-lib
    const pdfBuffer = await generatePDFCertificate({
        certificateId,
        userName: userData.name,
        courseName: course.title,
        instructorName: course.user?.name || "EduFlow Instructor",
        issueDate: new Date(),
        duration: course.duration,
        level: course.level,
    });

    // Upload to Vercel Blob
    const fileName = `certificates/${user.id}/${certificateId}.pdf`;
    const blob = await put(fileName, pdfBuffer, {
        access: "public",
        contentType: "application/pdf",
    });

    // Save to database
    const certificate = await prisma.certificate.create({
        data: {
            certificateId,
            userId: user.id,
            courseId,
            certificateUrl: blob.url,
        },
    });

    return { success: true, certificate };
}