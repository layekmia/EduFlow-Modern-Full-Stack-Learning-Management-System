import { cn } from "@/lib/utils";
import { CloudUpload, Upload, Video } from "lucide-react";
import { Button } from "../ui/button";

export default function RenderEmptyState({
  isDragActive,
  fileType,
  onSelect,
}: {
  isDragActive: boolean;
  fileType: "image" | "video";
  onSelect?: () => void;
}) {
  const isImage = fileType === "image";

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Icon */}
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center",
          isImage ? "bg-green-100" : "bg-blue-100",
        )}
      >
        {isDragActive ? (
          <Upload
            className={cn(
              "w-8 h-8 animate-bounce",
              isImage ? "text-green-600" : "text-blue-600",
            )}
          />
        ) : isImage ? (
          <CloudUpload className="w-8 h-8 text-green-600" />
        ) : (
          <Video className="w-8 h-8 text-blue-600" />
        )}
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <p className="text-lg font-medium">
          {isImage
            ? "Drop your images here or click to upload"
            : "Drop your videos here or click to upload"}
        </p>

        <p className="text-xs text-muted-foreground">
          {isImage
            ? "All image types (PNG, JPG, JPEG, WebP), max 5MB"
            : "All video types (MP4, WebM, MOV), max 100MB"}
        </p>

        <Button type="button" onClick={onSelect}>
          {isImage ? "Select Image" : "Select Video"}
        </Button>
      </div>
    </div>
  );
}
