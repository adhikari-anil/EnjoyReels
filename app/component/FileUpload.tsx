"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { LoaderPinwheel } from "lucide-react";

interface FileUploadProps {
  onSuccess?: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [upload, setUpload] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUpload(false);
  };

  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setUpload(false);
    setError(null);
    if (onSuccess) {
      onSuccess(res);
    }
  };

  const handleUploadProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const loadPercentage = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(loadPercentage));
    }
  };

  const handleUploadStart = () => {
    setUpload(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload video file! ");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("File Size must be less than 100MB ");
      }
    } else {
      const validFormat = ["image/jpeg", "image/png", "image/webp"];
      if (!validFormat.includes(file.type)) {
        setError("Image format should be PNG, JPEG or WebP");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be less than 5mb ");
        return false;
      }
    }
    return false;
  };
  return (
    <div className="space-y-2">
      <IKUpload
        fileName={fileType === "video" ? "video" : "image"}
        useUniqueFileName={true}
        validateFile={validateFile}
        accept={fileType === "video" ? "video/*" : "image/*"}
        className="file-input file-input-bordered w-full"
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={handleUploadProgress}
        onUploadStart={handleUploadStart}
        folder={fileType === "video" ? "/videos" : "/images"}
      />
      {upload && (
        <div className="flex items-center gap-2 text-sm">
          <LoaderPinwheel className="animate-spin w-4 h-4" />
          <span>Uploading...</span>
        </div>
      )}
      {
        error && (
            <div className="text-red-600">{error}</div>
        )
      }
    </div>
  );
}
