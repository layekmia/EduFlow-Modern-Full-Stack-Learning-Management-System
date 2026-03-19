import prisma from "@/lib/prisma";
import { requireUser } from "./require-user";

export async function getUserCertificates() {

    const user = await requireUser();

    const certificates = await prisma.certificate.findMany({
        where: { userId: user.id },
        include: {
            course: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    level: true,
                    duration: true,
                    category: true,
                    fileKey: true,
                },
            },
        },
        orderBy: {
            issueDate: "desc",
        },
    });

    return certificates;
}

export type CertificateType = Awaited<ReturnType<typeof getUserCertificates>>[number];