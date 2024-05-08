import connectDB from "@/lib/database";
import { NextResponse } from "next/server";
import userModel from "@/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email not registered" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
    }

    const jwtKey = process.env.JWTKEY;
    const token = jwt.sign({ id: user._id }, jwtKey, { expiresIn: "4h" });

    return NextResponse.json({
      message: "User login successful",
      token
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};