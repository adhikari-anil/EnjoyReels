"use client";

import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { apiClient } from "@/lib/api-client";
import { useState } from "react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface VideoFormData {
  title: string;
  description: string;
  videourl: string;
  thumbnailurl: string;
}

const VideoUploadForm = () => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videourl: "",
      thumbnailurl: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videourl", response.filePath);
    setValue("thumbnailurl", response.thumbnailUrl || response.filePath);
  };

  const handleProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    console.log("From Form: ", data);
    if (!data.videourl) {
      console.log("Please provide video first.");
      return;
    }
    setLoading(true);
    try {
      await apiClient.createVideo(data);
      setValue("title", "");
      setValue("description", "");
      setValue("videourl", "");
      setValue("thumbnailurl", "");
    } catch (error) {
      console.log("Error creating videos.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
        <label className="text-xl font-lobster">Title</label>
        <input
          type="text"
          placeholder="Your content Title"
          {...register("title", { required: "Title is required." })}
          className="p-2 h-14 text-lg font-mono border-2 border-cyan-950 rounded-lg"
        />
        </div>
        <div className="flex flex-col gap-2">
        <label className="text-xl font-lobster">Description</label>
        <input
          type="text"
          placeholder="Your Content Description"
          {...register("description", { required: "description is required." })}
          className="p-2 h-14 text-lg font-mono border-2 border-cyan-950 rounded-md"
        />
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <label className="text-xl font-lobster">Upload Here</label>
          <FileUpload
            fileType="video"
            onSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
        </div>
        <button type="submit" className="p-2 mt-5 w-1/5 h-14 text-lg font-mono border-2 border-cyan-950 rounded-md">Upload</button>
      </div>
    </form>
  );
};

export default VideoUploadForm;
