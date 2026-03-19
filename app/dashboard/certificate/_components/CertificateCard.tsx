"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Download,
  ExternalLink,
  Calendar,
  Clock,
  FileText,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useConstructUrl } from "@/utils/use-constract-url";
import { CertificateType } from "@/app/data/user/get-user-certificates";
import { formatDate } from "@/utils/helper";
import { useState } from "react";

interface CertificateCardProps {
  certificate: CertificateType;
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const thumbnailUrl = useConstructUrl(certificate.course.fileKey);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-400/10 to-yellow-600/10 rounded-tr-full" />

      {/* Top Gradient Bar */}
      <div className="h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />

      {/* Certificate Ribbon */}
      <div className="absolute top-4 right-0">
        <div className="relative">
          <div className="absolute right-0 w-16 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 transform rotate-45 translate-x-6 -translate-y-2" />
          <div className="absolute right-0 w-16 h-8 bg-gradient-to-r from-yellow-600 to-yellow-700 transform -rotate-45 translate-x-6 translate-y-2" />
        </div>
      </div>

      <CardContent className="p-0">
        {/* Header Section with Certificate Icon */}
        <div className="p-6 pb-4 border-b border-border/50">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-md" />
                <div className="relative p-3 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-muted-foreground/70">
                  {certificate.certificateId}
                </p>
                <h3 className="font-semibold text-lg leading-tight mt-0.5">
                  {certificate.course.title}
                </h3>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
            >
              {certificate.course.level}
            </Badge>
          </div>
        </div>

        {/* Thumbnail Section */}
        {thumbnailUrl && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/30">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image
              src={thumbnailUrl}
              alt={certificate.course.title}
              unoptimized
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Quick Preview Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Details Section */}
        <div className="p-6 space-y-4">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
            <span className="text-sm text-muted-foreground">
              {certificate.course.category}
            </span>
          </div>

          {/* Date and Duration in a grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>Issued</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(certificate.issueDate)}
              </p>
            </div>

            {certificate.course.duration && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Duration</span>
                </div>
                <p className="text-sm font-medium">
                  {certificate.course.duration} hours
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons - Redesigned */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link href={certificate.certificateUrl ?? ""} target="_blank">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Link>
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="w-full border-yellow-500/20 hover:bg-yellow-500/5 hover:border-yellow-500/30 transition-all duration-300"
              asChild
            >
              <Link href={certificate.certificateUrl ?? ""} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                View
              </Link>
            </Button>
          </div>

          {/* Share Option (Optional) */}
          <div className="flex items-center justify-center pt-1">
            <button className="text-xs text-muted-foreground hover:text-yellow-600 transition-colors flex items-center gap-1">
              <Share2 className="h-3 w-3" />
              Share Certificate
            </button>
          </div>
        </div>
      </CardContent>

      {/* Decorative Corner Accent */}
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-yellow-500/20 to-transparent rounded-tl-3xl" />
    </Card>
  );
}
