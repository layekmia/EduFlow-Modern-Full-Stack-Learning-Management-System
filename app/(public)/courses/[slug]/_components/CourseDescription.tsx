// components/CourseDescription.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CourseDescriptionProps {
  description: string;
  title?: string;
  maxHeight?: number;
}

export function CourseDescription({
  description,
  title = "Course Description",
  maxHeight = 200,
}: CourseDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>

      <div className="relative">
        <div
          className={cn(
            "prose prose-lg max-w-none dark:prose-invert overflow-hidden transition-all duration-300",
            !isExpanded && "max-h-[200px]",
            "prose-headings:font-semibold prose-headings:tracking-tight",
            "prose-h1:text-4xl prose-h1:mb-4",
            "prose-h2:text-3xl prose-h2:mb-3",
            "prose-h3:text-2xl prose-h3:mb-2",
            "prose-p:text-gray-700 dark:prose-p:text-gray-300",
            "prose-ul:list-disc prose-ul:pl-6",
            "prose-ol:list-decimal prose-ol:pl-6",
            "prose-li:mb-1",
            "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic",
            "prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
            "prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg",
            "prose-a:text-primary prose-a:underline prose-a:underline-offset-2",
            "prose-strong:font-bold",
            "prose-em:italic",
          )}
          style={{ maxHeight: !isExpanded ? maxHeight : "none" }}
        >
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
      >
        {isExpanded ? (
          <>
            Show less <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            Read more <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
