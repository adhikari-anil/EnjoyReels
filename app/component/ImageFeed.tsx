import React from "react";
import ImageComponent from "./ImageComponent";
import { IImage } from "@/models/Image";

interface IImageProps {
  image: IImage[];
}

const ImageFeed = ({ image }: IImageProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h1 className="text-xl font-lobster">Your Images</h1>
      <div className="grid grid-cols-4 gap-4">
        {image.map((image) => (
          <ImageComponent key={image._id?.toString()} image={image} />
        ))}
        {image.length === 0 && <div>No Image Found</div>}
      </div>
    </div>
  );
};

export default ImageFeed;
