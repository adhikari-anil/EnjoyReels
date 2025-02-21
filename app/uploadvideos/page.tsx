"use client";

import VideoUploadForm from "../component/VideoUploadForm";

const VideoUploadPage = () => {
  return (
    <div>
      <div className="h-screen flex flex-col gap-8 p-2 items-center justify-center bg-black">
        <h1 className="text-2xl font-lobster text-white">Upload New Reel</h1>
        <VideoUploadForm />
      </div>
    </div>
  );
};

export default VideoUploadPage;
