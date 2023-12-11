import User from "@/models/user";
import dbConnect from "@/utils/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request){
    const {username, email, password} = await request.json();
    await dbConnect();
    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        return new NextResponse("User has been created", {
          status: 201,
        });
      } catch (err) {
        return new NextResponse(err.message, {
          status: 500,
        });
    }
}