import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const response = await axios.post(
      "http://localhost:8001/api/login",
      data
    );

    const token = response.data.token;

    const res = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

   
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 
    });
     console.log(token);
    return res;
   
    

  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Login failed"
      },
      { status: error.response?.status || 500 }
    );
  }
}
