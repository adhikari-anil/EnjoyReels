import { IVideo } from "@/models/Video";
import React from "react";
import VideoComponent from "./VideoComponent";
import Loading from "./Loading";

interface IVideoProps {
  videos: IVideo[];
}

const VideoFeed = ({ videos }: IVideoProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h1 className="text-xl font-lobster">Your Videos</h1>
      <div className="grid grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoComponent key={video._id?.toString()} video={video} />
        ))}
        {videos.length === 0 && (
          <div>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoFeed;
