"use client";

import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { apiClient } from "@/lib/api-client";
import { useState } from "react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { useRouter } from "next/navigation";

interface ImageFormData {
  title: string;
  description: string;
  imgurl: string;
}

const ImageUploadForm = () => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ImageFormData>({
    defaultValues: {
      title: "",
      description: "",
      imgurl: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("imgurl", response.filePath);
  };

  const handleProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: ImageFormData) => {
    if (!data.imgurl) {
      console.log("Please provide image first.");
      return;
    }
    setLoading(true);
    try {
      await apiClient.createImage(data);
      setValue("title", "");
      setValue("description", "");
      setValue("imgurl", "");
    } catch (error) {
      console.log("Error creating videos.", error);
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-2/4 p-4 border-r-2 border-l-2 bg-blue-100 text-black rounded-lg z-10 shadow hover:shadow-lg"
    >
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
            {...register("description", {
              required: "description is required.",
            })}
            className="p-2 h-14 text-lg font-mono border-2 border-cyan-950 rounded-md"
          />
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <label className="text-xl font-lobster">Upload Here</label>
          <FileUpload
            fileType="image"
            onSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
        </div>
        <div className="flex justify-start">
          <button
            type="submit"
            className="p-2 mt-5 h-14 w-1/2 text-lg font-mono border-2 border-cyan-950 rounded-md"
          >
            Upload
          </button>
        </div>
      </div>
    </form>
  );
};

export default ImageUploadForm;
