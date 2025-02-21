"use client";

import ImageUploadForm from "../component/ImageUploadForm";

const ImageUploadPage = () => {
  return (
    <div>
      <div className="h-screen flex flex-col gap-8 p-2 items-center justify-center bg-black">
        <h1 className="text-2xl font-lobster text-white">Upload Your Content</h1>
        <ImageUploadForm />
      </div>
    </div>
  );
};

export default ImageUploadPage;