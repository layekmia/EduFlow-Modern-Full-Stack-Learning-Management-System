import { cn } from "@/lib/utils";
import { CloudUpload, ImageIcon, Upload } from "lucide-react";
import { Button } from "../ui/button";

export default function RenderEmptyState({
  isDragActive,
}: {
  isDragActive: boolean;
}) {
  return (
    <>
      <div
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center bg-primary/10",
        )}
      >
        {isDragActive ? (
          <Upload className="w-7 h-7 text-primary animate-bounce" />
        ) : (
          <CloudUpload className="w-7 h-7 text-primary" />
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">
          <div className="space-y-3">
            <p className="text-lg">
              Drop your files here or{" "}
              <span className="text-primary">click to upload</span>
            </p>
            <Button>Select File</Button>
          </div>
        </p>
      </div>
    </>
  );
}
