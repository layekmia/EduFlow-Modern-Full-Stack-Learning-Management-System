"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, ExternalLink, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useConstructUrl } from "@/utils/use-constract-url";
import { CertificateType } from "@/app/data/user/get-user-certificates";
import { formatDate } from "@/utils/helper";

interface CertificateCardProps {
  certificate: CertificateType;
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const thumbnailUrl = useConstructUrl(certificate.course.fileKey);

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600" />

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-full bg-yellow-500/10">
            <Award className="h-6 w-6 text-yellow-600" />
          </div>
          <Badge variant="outline" className="text-xs">
            {certificate.course.level}
          </Badge>
        </div>

        <p className="text-xs font-mono text-muted-foreground mb-2">
          {certificate.certificateId}
        </p>

        <h3 className="font-semibold text-lg mb-1 line-clamp-2">
          {certificate.course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
          {certificate.course.category}
        </p>

        {thumbnailUrl && (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4 border">
            <Image
              src={thumbnailUrl}
              alt={certificate.course.title}
              unoptimized
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Issued: {formatDate(certificate.issueDate)}</span>
          </div>
          {certificate.course.duration && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{certificate.course.duration} hours</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {certificate.certificateUrl && (
            <>
              <Button size="sm" className="flex-1" asChild>
                <Link href={certificate.certificateUrl} target="_blank">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href={certificate.certificateUrl} target="_blank">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
