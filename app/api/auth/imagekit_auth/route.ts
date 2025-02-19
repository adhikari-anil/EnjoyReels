import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
  privateKey: process.env.NEXT_PRIVATE_IMAGEKIT_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL!,
});

export async function GET() {
  try {
    return NextResponse.json(imagekit.getAuthenticationParameters());
  } catch (error) {
    return NextResponse.json(
      { error: "Imagekit Authentication Failed.." },
      { status: 500 }
    );
  }
}
