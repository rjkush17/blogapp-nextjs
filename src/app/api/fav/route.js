import connectDB from "@/lib/database";
import Fav from "@/models/favModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  try {
    const data = await req.json();
    const { userID, blogID } = data;

    if (!userID || !blogID) {
      return NextResponse.json({ error: "User ID and Blog ID are required" }, { status: 400 });
    }

    const user = await User.findById(userID);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let fav = await Fav.findOne({ userID });
    if (!fav) {
      fav = new Fav({ userID, email: user.email, blogs: [] });
    }

    // Add or remove the blog ID
    if (fav.blogs.includes(blogID)) {
      fav.blogs = fav.blogs.filter((id) => id.toString() !== blogID);
      if (fav.blogs.length === 0) {
        await Fav.deleteOne({ userID: userID });
        return NextResponse.json({ message: "All favorite blogs removed, fav entry deleted" }, { status: 200 });
      } else {
        await fav.save();
        return NextResponse.json({ message: "Blog removed from favorites" }, { status: 200 });
      }
    } else {
      fav.blogs.push(blogID);
      await fav.save();

      return NextResponse.json({ message: "Blog added to favorites"}, { status: 200 })}

  } catch (error) {
    console.error("Error managing favorite blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }}

