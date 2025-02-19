"use client";

import VideoUploadForm from "../component/VideoUploadForm";

const VideoUploadPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-lobster">Upload New Reel</h1>
        <VideoUploadForm />
      </div>
    </div>
  );
};

export default VideoUploadPage;
