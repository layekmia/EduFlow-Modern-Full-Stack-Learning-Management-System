import { cn } from "@/lib/utils";
import { CloudUpload, FileText, Upload, Video } from "lucide-react";

export default function RenderEmptyState({
  isDragActive,
  fileType,
}: {
  isDragActive: boolean;
  fileType: "image" | "video" | "pdf";
}) {
  const getIcon = () => {
    if (isDragActive) return <Upload className="w-8 h-8 animate-bounce" />;
    if (fileType === "image") return <CloudUpload className="w-8 h-8" />;
    if (fileType === "video") return <Video className="w-8 h-8" />;
    return <FileText className="w-8 h-8" />;
  };

  const getColor = () => {
    if (fileType === "image") return "text-green-600 bg-green-100";
    if (fileType === "video") return "text-blue-600 bg-blue-100";
    return "text-purple-600 bg-purple-100";
  };

  const getTitle = () => {
    if (isDragActive) return "Drop your file here";
    if (fileType === "image") return "Drop your images here or click to upload";
    if (fileType === "video") return "Drop your videos here or click to upload";
    return "Drop your PDF here or click to upload";
  };

  const getDescription = () => {
    if (fileType === "image") return "PNG, JPG, JPEG, WebP (max 5MB)";
    if (fileType === "video") return "MP4, WebM, MOV (max 100MB)";
    return "PDF documents (max 10MB)";
  };

  const getButtonText = () => {
    if (fileType === "image") return "Select Image";
    if (fileType === "video") return "Select Video";
    return "Select PDF";
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center",
          getColor(),
        )}
      >
        {getIcon()}
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-medium">{getTitle()}</p>
        <p className="text-xs text-muted-foreground">{getDescription()}</p>
      </div>
    </div>
  );
}
