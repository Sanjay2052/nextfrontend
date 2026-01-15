import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Optimization: Running all three requests in parallel
    const [profileRes, questionsRes, answerRes] = await Promise.all([
      axios.get("http://localhost:8002/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://localhost:8003/api/question/userquestion", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://localhost:8004/api/answer/useranswer", {
        headers: { Authorization: `Bearer ${token}` },
      })
    ]);
    return NextResponse.json({
      user: profileRes.data,
      questions: questionsRes.data,
      answer: answerRes.data,
    });
   
    

  } catch (error: any) {
    console.error("Gateway Error:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Failed to fetch user data from microservices" },
      { status: error.response?.status || 500 }
    );
  }
}