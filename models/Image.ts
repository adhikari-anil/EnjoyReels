import mongoose, { model, models, Schema } from "mongoose";

export const IMAGE_DIMENSION = {
  height: 1080,
  width: 1920,
} as const;

export interface IImage {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  imgurl: string;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}

const imageSchema = new Schema<IImage>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgurl: { type: String, required: true },
    transformation: {
      height: { type: Number, default: IMAGE_DIMENSION.height },
      width: { type: Number, default: IMAGE_DIMENSION.width },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);

const Image = models?.Image || model<IImage>("Image", imageSchema);

export default Image;
