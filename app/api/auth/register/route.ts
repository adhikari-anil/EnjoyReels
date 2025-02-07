import { NextRequest, NextResponse } from "next/server";  //for using req and res
import { connectToDataBase } from "@/lib/db";             // for database connection
import User from "@/models/User";

export async function POST(request: NextRequest){
    try {
        const {email, password} = await request.json();

        if(!email || !password){
            return NextResponse.json(
                {error: "Email and Password are required."},
                {status: 400}
            )
        };

        await connectToDataBase();

        const existingUser = await User.findOne({email});

        if(existingUser){
            return NextResponse.json(
                {error: "User already exist."},
                {status: 400}
            )
        };

        await User.create({
            email,
            password
        });

        return NextResponse.json(
            {message: "User is created sucessfully."},
            {status: 201}
        );
    } catch (error) {
        return NextResponse.json(
            {error: "Failed to register User."},
            {status: 500}
        )
    }
}