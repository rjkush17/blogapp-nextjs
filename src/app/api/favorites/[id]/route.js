import connectDB from "@/lib/database";
import blogModel from "@/models/blogModel";
import Fav from "@/models/favModel";
import { NextResponse } from "next/server";

export async function GET(req, cont) {
  await connectDB();
  console.log("work")

  let userID = cont.params.id;
  if (!userID) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }



  try {
    const fav = await Fav.findOne({ userID: userID });

    if (!fav) {
      return NextResponse.json(
        { message: "No favorite blogs found"},
        { status: 200 }
      );
    }


    const blog = await blogModel.find({ _id:{ $in:fav.blogs }});
    if (!blog) {
      return NextResponse.json({ message: "No blogs found" }, { status: 404 });
    }

    return NextResponse.json({ blogs: blog }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving favorite blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
