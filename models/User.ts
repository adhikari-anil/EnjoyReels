import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  provider: string;
  provider_id: string;
  avatar_url: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return !this.provider; // required if no provider
      },
      default: null,
    },
    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },
    provider_id: {
      type: String,
      default: null,
    },
    avatar_url: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;
