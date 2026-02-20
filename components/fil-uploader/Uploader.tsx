"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import RenderEmptyState from "./RenderEmptyState";
import {
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState";
import { useConstructUrl } from "@/utils/use-constract-url";

interface FileUploadProps {
  onChange: (url: string) => void;
  value?: string;
  className?: string;
}

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  errorMessage: string | null;
  objectUrl?: string | null;
  fileType: "image" | "video";
}

export function FileUpload({ onChange, value, className }: FileUploadProps) {
  const fileUrl = useConstructUrl(value || "");

  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    error: false,
    errorMessage: "",
    file: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
    key: value,
    objectUrl: fileUrl,
  });

  const rejectedFiles = useCallback((fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files",
      );

      const fileSizeBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large",
      );

      if (tooManyFiles) {
        setFileState((prev) => ({
          ...prev,
          errorMessage: "Too many files selected, max is 1",
        }));
      }
      if (fileSizeBig) {
        setFileState((prev) => ({
          ...prev,
          errorMessage: "File size exceeds the limit",
        }));
      }
    }
  }, []);

  const uploadFile = useCallback(
    async (file: File) => {
      setFileState((prev) => ({
        ...prev,
        uploading: true,
        progress: 0,
        error: false,
      }));

      const fileData = {
        fileName: file.name,
        contentType: file.type,
        size: file.size,
        isImage: true,
      };

      try {
        const presignedResponse = await axios.post("/api/s3/upload", fileData);
        const { presignedUrl, key } = presignedResponse.data;

        await axios.put(presignedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;

            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );

            setFileState((prev) => ({
              ...prev,
              progress: percent,
            }));
          },
        });

        setFileState((prev) => ({
          ...prev,
          uploading: false,
          key: key,
        }));

        toast.success("File uploaded successfully");
        onChange(key);
      } catch (error) {
        console.error("error", error);
        toast.error("Failed to upload");

        setFileState((prev) => ({
          ...prev,
          progress: 0,
          uploading: false,
          error: true,
          errorMessage: "Upload failed. Please try again.",
        }));
      }
    },
    [onChange],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Clean up old preview URL if exists
        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        const newObjectUrl = URL.createObjectURL(file);

        setFileState({
          file: file,
          uploading: false,
          progress: 0,
          objectUrl: newObjectUrl,
          error: false,
          errorMessage: "",
          id: uuidv4(),
          isDeleting: false,
          fileType: "image",
          key: undefined,
        });

        uploadFile(file);
      }
    },
    [fileState.objectUrl, uploadFile], // ✅ Added uploadFile to deps
  );

  const handleRemoveFile = useCallback(async () => {
    if (fileState.isDeleting || !fileState.objectUrl) return;

    setFileState((prev) => ({
      ...prev,
      isDeleting: true,
    }));

    try {
      // Delete from S3 if key exists
      if (fileState.key) {
        await axios.delete("/api/s3/delete", {
          data: { key: fileState.key },
        });
        toast.success("File deleted successfully");
      }

      // Clean up preview URL
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      // Reset everything
      setFileState({
        id: null,
        file: null,
        uploading: false,
        progress: 0,
        key: undefined,
        isDeleting: false,
        error: false,
        errorMessage: null,
        objectUrl: null,
        fileType: "image",
      });
      onChange("");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete file. Please try again.");

      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
        errorMessage: "Failed to delete file",
      }));
    }
  }, [fileState.isDeleting, fileState.objectUrl, fileState.key, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: rejectedFiles,
    disabled: fileState.isDeleting || !!fileState.objectUrl,
  });

  const renderContent = useCallback(() => {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          file={fileState.file as File}
          progress={fileState.progress}
        />
      );
    }

    if (fileState.error) {
      return (
        <RenderErrorState
          errorMessage={fileState.errorMessage ?? "Something went wrong"}
        />
      );
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          handleRemoveFile={handleRemoveFile}
        />
      );
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  }, [
    fileState.uploading,
    fileState.error,
    fileState.errorMessage,
    fileState.objectUrl,
    fileState.isDeleting,
    fileState.file,
    fileState.progress,
    handleRemoveFile,
    isDragActive,
  ]);

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed relative rounded-lg p-6 cursor-pointer transition-all",
          "hover:border-primary hover:bg-primary/5",
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300",
          fileState.error ? "border-red-500 bg-red-50" : "",
          "flex flex-col items-center justify-center gap-3 min-h-[200px]",
        )}
      >
        <input {...getInputProps()} />
        {renderContent()}
      </div>
    </div>
  );
}
