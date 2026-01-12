import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value; 

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const response = await axios.get(
      "http://localhost:8002/api/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    return NextResponse.json(response.data);
    

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
      return NextResponse.json(
        { message: error.response?.data?.message || "Backend service error" },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}