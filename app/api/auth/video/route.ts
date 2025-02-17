import { connectToDataBase } from "@/lib/db";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  //1. error handle.
  //2. connecting database.
  //3. model import.
  //4. find videos from database.
  //5. checking and returning empty array
  //6. no error return videos
  //7. catching errors.
  try {
    await connectToDataBase();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 500 });
    }

    return NextResponse.json(videos);
  } catch (error) {
    console.log("From video get Method: ", error);
    return NextResponse.json(
      { error: "Failled to get videos. " },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  //1. check session.
  //2. send response if no session.
  //3. connect to db.
  //4. take data recieved from frontend.
  //5. validate it and return response.
  //6. add some more required data to store in db.
  //7. code to add data in db.
  //8. retrun response of data created.
  //9. handle errors.
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized User!" },
        { status: 401 }
      );
    }
    await connectToDataBase();
    const body = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.videourl ||
      !body.thumbnailurl
    ) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 201 }
      );
    }

    const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);

    return NextResponse.json(
      { message: "Video uploaded successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to store Videos", error);
    return NextResponse.json(
      { error: "Failed to store Videos" },
      { status: 500 }
    );
  }
}
