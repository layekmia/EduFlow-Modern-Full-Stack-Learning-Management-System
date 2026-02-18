// components/ui/file-upload.tsx
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

interface FileUploadProps {
  onChange: (url: string) => void;
  value?: string;
  className?: string;
}

export function FileUpload({ onChange, value, className }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Show preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setIsUploading(true);
      setProgress(0);

      try {
        // 1. Get signature from your API
        const { data: signData } = await axios.post("/api/upload");

        // 2. Prepare form data for Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", signData.apiKey);
        formData.append("timestamp", signData.timestamp.toString());
        formData.append("signature", signData.signature);
        formData.append("folder", signData.folder);

        // 3. Upload directly to Cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );
                setProgress(percent);
              }
            },
          },
        );

        // 4. Get the secure URL
        const imageUrl = response.data.secure_url;
        onChange(imageUrl);
        setProgress(100);

        setTimeout(() => {
          setIsUploading(false);
          setProgress(0);
        }, 500);
      } catch (error) {
        console.error("Upload error:", error);
        setPreview(null);
        setIsUploading(false);
        setProgress(0);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = () => {
    setPreview(null);
    onChange("");
  };

  return (
    <div className={cn("w-full", className)}>
      {!preview ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all",
            "hover:border-primary hover:bg-primary/5",
            isDragActive ? "border-primary bg-primary/10" : "border-gray-300",
            "flex flex-col items-center justify-center gap-3 min-h-[200px]",
          )}
        >
          <input {...getInputProps()} />
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            {isDragActive ? (
              <Upload className="w-6 h-6 text-primary animate-bounce" />
            ) : (
              <ImageIcon className="w-6 h-6 text-primary" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">
              {isDragActive
                ? "Drop your image here"
                : "Drag & drop or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, JPEG, GIF up to 5MB
            </p>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border group">
          {/* Preview Image */}
          <div className="relative aspect-video w-full">
            <Image
              src={preview}
              alt="Course thumbnail"
              fill
              className="object-cover"
            />

            {/* Upload Overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-2" />
                <span className="text-white text-sm font-medium">
                  Uploading... {progress}%
                </span>
              </div>
            )}

            {/* Remove Button */}
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Change Image Button */}
            <div
              {...getRootProps()}
              className="absolute bottom-2 right-2 w-8 h-8 bg-white text-gray-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 cursor-pointer shadow-md"
            >
              <input {...getInputProps()} />
              <Upload className="w-4 h-4" />
            </div>
          </div>

          {/* Image Info Bar */}
          <div className="bg-gray-50 px-3 py-2 text-xs text-muted-foreground flex justify-between items-center">
            <span>Course Thumbnail</span>
            <span className="font-medium text-primary">Click to change</span>
          </div>
        </div>
      )}
    </div>
  );
}
