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
    const two_blogs = await blogModel.aggregate([{ $sample: { size: 3 } }, { $project: { _id: 1, title: 1, featured_img: 1, img:1, description: 1, category : 1 } },])
    if (!two_blogs) {
      return NextResponse.json(
        { error: "blog data not found" },
        { status: 400 }
      );
    }



    return NextResponse.json(
      { msg: "data fetch succesfully", blogs: blog_data, suggestion : two_blogs},
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
