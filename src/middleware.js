import { NextResponse } from "next/server";
import { jwtVerify } from "jose";



const  getJwtKey = async () => {
  const secret = process.env.JWTKEY;
  if (!secret) {
    throw new Error("JWT key not found");
  }
  // Convert the secret to a Uint8Array
  return new TextEncoder().encode(secret);
};

export async  function middleware(req) {

  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Authorization token not found" },
      { status: 400 }
    );
  }

  try {
    const token = authorization.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "Invalid Authorization Token" },
        { status: 400 }
      );
    }

    let decoded;
    try {
      const jwtKey = await getJwtKey();
      const { payload } = await jwtVerify(token, jwtKey);
      decoded = payload;
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid Authorization Token" },
        { status: 401 }
      );
    }
    const user = decoded.user;
    if (!user || !user.email) {
      return NextResponse.json(
        { error: "Invalid Authorization Token" },
        { status: 400 }
      );
    }

    return NextResponse.next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "Invalid Authorization Token" },
        { status: 401 }
      );
    }
    // Handle other unexpected errors
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: ["/api/fav/:path*", "/api/favorites/:path"],
};