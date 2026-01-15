import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, details, tags, code } = await req.json();

    // Map 'details' to 'description' for the Express Backend
    const backendPayload = {
      title,
      description: details, 
      tags,
      code,
    };

    const response = await axios.post("http://localhost:8003/api/question",
      backendPayload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return NextResponse.json(response.data, { status: 201 });

  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Internal Server Error";
    return NextResponse.json({ message }, { status });
  }
}