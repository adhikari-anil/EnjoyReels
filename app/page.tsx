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
          const videodata = (await apiClient.getVideos()) as IVideo[];
          console.log(videodata);
          setVideos(videodata);
        } catch (error) {
          console.log("Issue in getting videos", error);
        }
      };
      fetchVideos();
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      const fetchImages = async () => {
        try {
          const imagedata = (await apiClient.getImages()) as IImage[];
          console.log(imagedata);
          setImages(imagedata);
        } catch (error) {
          console.log("Issue in getting videos", error);
        }
      };
      fetchImages();
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
