"use client";

import { useEffect, useState } from "react";
import Header from "./component/Header";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import VideoFeed from "./component/VideoFeed";
import { useSession } from "next-auth/react";

export default function Page() {
  const [video, setVideos] = useState<IVideo[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const fetchVideos = async () => {
        try {
          const data = (await apiClient.getVideos()) as IVideo[];
          setVideos(data);
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
      {!session && <h1>Please LogIn!</h1>}
    </div>
  );
}
