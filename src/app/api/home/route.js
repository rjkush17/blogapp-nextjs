import connectDB from "@/lib/database";
import blogModel from "@/models/blogModel";
import { NextResponse } from "next/server";

//Post API for creating new blog
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    if (!data) {
      return NextResponse.json({ error: "data not found" }, { status: 400 });
    }
    await blogModel.create(data);
    return NextResponse.json({ msg: "blog created" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 400 }
    );
  }
}

// GET api for Home page
export async function GET(req) {
  try {
    await connectDB();

    const rendom_data = await blogModel.aggregate([
      { $sample: { size: 5 } },
      { $project: { _id: 1, title: 1, featured_img: 1, img:1, description: 1 } },
    ]);
    if (!rendom_data) {
      return NextResponse.json(
        { error: "Random data not found" },
        { status: 400 }
      );
    }

    const featured_data = await blogModel.find(
      { featured: true },
      { _id: 1, title: 1, featured_img: 1,img:1, description: 1 }
    );
    if (!featured_data) {
      return NextResponse.json(
        { error: "featured data not found" },
        { status: 400 }
      );
    }

    const health_data = await blogModel.aggregate([
      { $match: { category: "health" } },
      { $sample: { size: 4 } },
      { $project: { _id: 1, title: 1, featured_img: 1,img:1, description: 1 } },
    ]);
    if (!health_data) {
      return NextResponse.json(
        { error: "Health data not found" },
        { status: 400 }
      );
    }

    const travel_data = await blogModel.aggregate([
      { $match: { category: "travel" } },
      { $sample: { size: 4 } },
      { $project: { _id: 1, title: 1, featured_img: 1,img:1, description: 1 } },
    ]);
    if (!travel_data) {
      return NextResponse.json(
        { error: "Health data not found" },
        { status: 400 }
      );
    }
    return NextResponse.json({ msg: "data fected succesfully",home_data:{random:rendom_data, featured:featured_data, health:health_data, travel:travel_data}});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 400 }
    );
  }
}
