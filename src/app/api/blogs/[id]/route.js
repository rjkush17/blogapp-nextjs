import connectDB from "@/lib/database";
import blogModel from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(req, cont) {
  try {
    let id = cont.params.id;
    await connectDB();
    const blog_data = await blogModel.find({ _id: id });
    if (!blog_data) {
      return NextResponse.json(
        { error: "blog data not found" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { msg: "data fetch succesfully", blogs: blog_data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 400 }
    );
  }
}
