import { AlertCircle, Loader2, XIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export function RenderUploadedState({
  previewUrl,
  isDeleting,
  handleRemoveFile,
  fileType,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
  fileType: "image" | "video";
}) {
  return (
    <div className="relative w-full h-full min-h-[250px] flex items-center justify-center">
      <div className="relative max-w-full max-h-[250px] w-auto h-auto">
        {fileType === "image" ? (
          <Image
            unoptimized
            src={previewUrl}
            alt="Uploaded File"
            width={500}
            height={500}
            className="object-contain rounded-lg max-w-full max-h-[250px] w-auto h-auto"
            style={{ width: "auto", height: "auto" }}
          />
        ) : (
          <video
            src={previewUrl}
            controls
            className="rounded-lg max-h-[250px] w-full"
          />
        )}
      </div>

      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2"
        onClick={handleRemoveFile}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
}

export function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-4">
      <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4" />

      <p className="text-white text-sm font-medium truncate max-w-[220px] text-center">
        {file.name}
      </p>

      <p className="text-white/80 text-xs mb-3">Uploading... {progress}%</p>

      <div className="w-56 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function RenderErrorState({
  errorMessage,
  onRetry,
}: {
  errorMessage: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 p-4">
      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-red-100">
        <AlertCircle className="w-7 h-7 text-red-500" />
      </div>

      <div>
        <p className="text-sm font-semibold text-red-600">Upload failed</p>

        <p className="text-xs text-muted-foreground mt-1 max-w-[220px]">
          {errorMessage}
        </p>
      </div>

      {onRetry && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-1"
        >
          Try again
        </Button>
      )}
    </div>
  );
}
