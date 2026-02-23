"use client";

import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  href,
  icon,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "rounded-lg border border-dashed",
        "bg-muted/30 p-10 text-center",
        "animate-in fade-in zoom-in-95",
      )}
    >
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        {icon ? icon : <Ban className="size-10 text-primary" />}
      </div>

      <h2 className="mt-6 text-xl font-semibold">{title}</h2>

      <p className="mt-2 mb-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <Link href={href} className={buttonVariants({ size: "sm" })}>
        <PlusCircle className="size-4 mr-2" />
        {buttonText}
      </Link>
    </div>
  );
}
