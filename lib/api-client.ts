import { IVideo } from "@/models/Video";
import { IImage } from "@/models/Image";

export type VideoFormData = Omit<IVideo, "_id">;
export type ImageFormData = Omit<IImage, "_id">;

type FetchOptionsTypes = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptionsTypes = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api/auth${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  }

  async getVideos() {
    return this.fetch("/video");
  }

  async getImages(){
    return this.fetch("/image");
  }

  async getAVideo(id: string) {
    return this.fetch(`/video/${id}`);
  }

  async getAImage(id: string) {
    return this.fetch(`/image/${id}`);
  }

  async createVideo(videoData: VideoFormData) {
    return this.fetch("/video", {
      method: "POST",
      body: videoData,
    });
  }

  async createImage(imageData: ImageFormData) {
    return this.fetch("/video", {
      method: "POST",
      body: imageData,
    });
  }
}

export const apiClient = new ApiClient();
