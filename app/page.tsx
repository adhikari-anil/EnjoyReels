"use client";

import Header from "./component/Header";
import VideoUploadPage from "./upload/page";

export default function page() {
  return (
    <div className="flex flex-col gap-2 p-5">
      <Header />
      <div>
        <VideoUploadPage />
      </div>
    </div>
  );
}
