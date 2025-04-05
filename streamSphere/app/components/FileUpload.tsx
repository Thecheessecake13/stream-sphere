"use client";

import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: any) => {
    console.error("Upload error details:", {
      error: err,
      message: err?.message,
      type: typeof err,
      stack: err?.stack
    });

    let errorMessage = "Upload failed";
    if (err?.message) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    } else if (err?.response?.data?.message) {
      errorMessage = err.response.data.message;
    }

    setError(errorMessage);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Upload success response:", response);
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleStartUpload = () => {
    console.log("Starting upload...");
    setUploading(true);
    setError(null);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      console.log("Upload progress:", Math.round(percentComplete), "%");
      onProgress(Math.round(percentComplete));
    }
  };

  const validateFile = (file: File) => {
    console.log("Validating file:", {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: new Date(file.lastModified).toISOString()
    });

    if (fileType === "video") {
      // Accept more video formats
      const validVideoTypes = [
        "video/mp4",
        "video/quicktime",
        "video/x-msvideo",
        "video/x-matroska",
        "video/webm"
      ];

      if (!validVideoTypes.includes(file.type)) {
        const error = `Please upload a valid video file. Supported formats: MP4, MOV, AVI, MKV, WebM. Current file type: ${file.type}`;
        console.log("Validation failed:", error);
        setError(error);
        return false;
      }

      if (file.size > 100 * 1024 * 1024) {
        const error = `Video size must be less than 100MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
        console.log("Validation failed:", error);
        setError(error);
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif", "image/avif"];
      if (!validTypes.includes(file.type)) {
        const error = `Please upload a valid image file (JPEG, JPG, PNG, WebP, GIF, or AVIF). Current file type: ${file.type}`;
        console.log("Validation failed:", error);
        setError(error);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        const error = `File size must be less than 10MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
        console.log("Validation failed:", error);
        setError(error);
        return false;
      }
    }
    console.log("File validation passed");
    return true;
  };

  const acceptedFileTypes = fileType === "video"
    ? ".mp4,.mov,.avi,.mkv,.webm"
    : ".jpg,.jpeg,.png,.webp,.gif,.avif";

  return (
    <div className="space-y-2">
      <IKUpload
        fileName={fileType === "video" ? "video" : "image"}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        onUploadProgress={handleProgress}
        accept={acceptedFileTypes}
        className="file-input file-input-bordered w-full"
        validateFile={validateFile}
        useUniqueFileName={true}
        folder={fileType === "video" ? "/videos" : "/images"}
      />

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Uploading {fileType}...</span>
        </div>
      )}

      {error && (
        <div className="text-error text-sm">
          <p>Error: {error}</p>
          <p className="text-xs mt-1">Please try again or contact support if the issue persists.</p>
        </div>
      )}
    </div>
  );
}
