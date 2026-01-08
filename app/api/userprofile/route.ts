import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    

    const response = await axios.post(
      "http://localhost:8001/api/userprofile",
  
    );

    const token = response.data.token;

    const res = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

   

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
