"use client";

import { useEffect, useState } from "react";
import Header from "./component/Header";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import VideoFeed from "./component/VideoFeed";
import { useSession } from "next-auth/react";
import { IImage } from "@/models/Image";
import ImageFeed from "./component/ImageFeed";

export default function Page() {
  const [video, setVideos] = useState<IVideo[]>([]);
  const [image, setImages] = useState<IImage[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const fetchVideos = async () => {
        try {
          if(video || !video){
            const data = (await apiClient.getVideos()) as IVideo[];
            setVideos(data);
          }else if(image){
            const data = (await apiClient.getImages()) as IImage[];
            setImages(data);
          }
        } catch (error) {
          console.log("Issue in getting videos", error);
        }
      };
      fetchVideos();
    }
  }, [session]);

  return (
    <div className="h-full w-full flex flex-col gap-2 p-5">
      <Header />
      {session && <VideoFeed videos={video} />}
      {session && <ImageFeed image={image} />}
      {!session && <h1>Please LogIn!</h1>}
    </div>
  );
}
