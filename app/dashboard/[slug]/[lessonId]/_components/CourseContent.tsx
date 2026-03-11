"use client";

import { CourseDescription } from "@/app/(public)/courses/[slug]/_components/CourseDescription";
import { LessonContentType } from "@/app/data/courses/get-lesson-content";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/lib/try-catch";
import { useConstructUrl } from "@/utils/use-constract-url";
import { CheckCircle, VideoOff } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { markLessonComplete } from "../actions";
import { toast } from "sonner";
import { useConfetti } from "@/hooks/use-confetti";

interface iAppProps {
  data: LessonContentType;
}

function VideoPlayer({
  videoKey,
  thumbnailKey,
}: {
  videoKey?: string | null;
  thumbnailKey?: string | null;
}) {
  const constructedVideoUrl = useConstructUrl(videoKey || "");
  const constructedThumbnailUrl = useConstructUrl(thumbnailKey || "");

  const videoUrl = videoKey ? constructedVideoUrl : "";
  const thumbnailUrl = thumbnailKey ? constructedThumbnailUrl : "";

  const [generatedPoster, setGeneratedPoster] = useState<string>("");
  const poster = thumbnailUrl || generatedPoster;

  useEffect(() => {
    if (!videoUrl) return;

    if (thumbnailUrl) {
      return;
    }

    let cancelled = false;

    const v = document.createElement("video");
    v.src = videoUrl;
    v.crossOrigin = "anonymous";
    v.muted = true;
    v.playsInline = true;

    const capture = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = v.videoWidth || 1280;
        canvas.height = v.videoHeight || 720;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");

        if (!cancelled) setGeneratedPoster(dataUrl);
      } catch {
        // if CORS blocks canvas, just leave poster empty
      }
    };

    const onLoadedMeta = () => {
      try {
        v.currentTime = 1;
      } catch {}
    };

    const onSeeked = () => capture();

    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("seeked", onSeeked);
    v.addEventListener("loadeddata", () => {
      if (!generatedPoster) capture();
    });

    return () => {
      cancelled = true;
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("seeked", onSeeked);
      v.src = "";
    };
  }, [videoUrl, thumbnailUrl, generatedPoster]);

  if (!videoKey) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center flex-col">
        <VideoOff className="size-16 mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">No video for this lesson</p>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
      <video
        className="w-full h-full object-cover"
        controls
        poster={poster || undefined}
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default function CourseContent({ data }: iAppProps) {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, data.chapter.course.slug),
      );

      if (error) {
        toast.error("An unexpected error occurred. pease try again");
        return;
      }
      if (!result) return;

      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="flex flex-col h-full bg-background lg:pl-6">
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ""}
        videoKey={data.videoKey ?? ""}
      />
      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant={"outline"}
            className="bg-green-500/10 text-green-500 hover:text-green-600"
          >
            <CheckCircle className="size-4 mr-2 text-green-500" /> Completed
          </Button>
        ) : (
          <Button disabled={pending} variant={"outline"} onClick={onSubmit}>
            <CheckCircle className="size-4 mr-2 text-green-500" />
            Mark as Complete
          </Button>
        )}
      </div>

      <div className="pt-3">
        {data.description && (
          <CourseDescription
            description={data.description}
            title={data.title}
          />
        )}
      </div>
    </div>
  );
}
