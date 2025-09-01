import { connectToDataBase } from "@/lib/db";
import { authOptions } from "@/lib/option";
import Image from "@/models/Image";
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
    const session = await getServerSession(authOptions);
    console.log("Login Information: ", session);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized User!" },
        { status: 401 }
      );
    }
    const images = await Image.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();
    if (!images || images.length === 0) {
      return NextResponse.json([{ message: 0 }], { status: 500 });
    }

    return NextResponse.json(images);
  } catch (error) {
    console.log("From image GET Method: ", error);
    return NextResponse.json(
      { error: "Failled to get images. " },
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
    const session = await getServerSession(authOptions);
    console.log("Session creating image: ", session);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized User!" },
        { status: 401 }
      );
    }
    await connectToDataBase();
    const body = await request.json();
    console.log("Data from frontend: ", body);

    if (!body.title || !body.description || !body.imgurl) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 201 }
      );
    }

    const imageData = {
      ...body,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
      userId: session.user.id,
    };

    const newImage = await Image.create(imageData);

    if (newImage) {
      return NextResponse.json(
        { message: "Image uploaded successfully." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Failed to store Images", error);
    return NextResponse.json(
      { error: "Failed to store Images" },
      { status: 500 }
    );
  }
}
