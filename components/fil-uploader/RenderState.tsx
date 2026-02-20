import { AlertCircle, Loader2, XIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export function RenderUploadedState({
  previewUrl,
  isDeleting,
  handleRemoveFile,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
}) {
  return (
    <div className="relative w-full h-full min-h-[250px] flex items-center justify-center">
      {/* Image container with auto sizing */}
      <div className="relative max-w-full max-h-[250px] w-auto h-auto">
        <Image
        unoptimized
          src={previewUrl}
          alt="Uploaded File"
          width={500}
          height={500}
          className="object-contain rounded-lg max-w-full max-h-[250px] w-auto h-auto"
          style={{ width: "auto", height: "auto" }}
        />
      </div>

      {/* Delete button */}
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
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-2" />
      <span className="text-white text-sm font-medium">
        Uploading... {progress}%
      </span>
    </div>
  );
}

export function RenderErrorState({ errorMessage }: { errorMessage: string }) {
  return (
    <>
      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-red-100">
        <AlertCircle className="w-7 h-7 text-red-500" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-red-600">Upload failed</p>
        <p className="text-xs text-red-500 mt-2">{errorMessage}</p>
      </div>
    </>
  );
}
