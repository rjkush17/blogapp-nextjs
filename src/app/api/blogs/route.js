import connectDB from "@/lib/database";
import blogModel from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(req){
  try {
    await connectDB();
    const blogs_data = await blogModel.find();
    if (!blogs_data) {
     return NextResponse.json({ error: "blog data not found" }, { status: 400 });
    }
   return NextResponse.json({msg: "data fetch succesfully", blogs : blogs_data },{ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 400 }
    );
  }
};
