import connectDB from "@/lib/database";
import { NextResponse } from "next/server";
import userModel from "@/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  try {
    await connectDB();
    const registerData = await req.json();
    if (!registerData) {
      return NextResponse.json({ error: "Data not found" }, { status: 400 });
    }

    const { email, password, firstname, lastname } = registerData;

    const isEmailTaken = await userModel.findOne({ email });
    if (isEmailTaken) {
      return NextResponse.json({ error: "Email is already taken" }, { status: 400 });
    }
    
    if (firstname.length < 4 || lastname.length < 4) {
      return NextResponse.json({ error: "First and last name should be at least 4 characters long" }, { status: 400 });
    }
    
    if (password.length < 6) {
      return NextResponse.json({ error: "Password should have at least 6 characters" }, { status: 400 });
    }

    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    registerData.password = hash;
    const newUser = await userModel.create(registerData);
    if (!newUser) {
      return NextResponse.json({ error: "User not created" }, { status: 400 });
    }

    const jwtKey = process.env.JWTKEY;
    const token = jwt.sign({ id: newUser._id }, jwtKey, { expiresIn: "3h" });

    return NextResponse.json({
      message: "User registration is successful",
      token
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
