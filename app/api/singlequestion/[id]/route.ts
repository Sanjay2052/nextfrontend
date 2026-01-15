import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const [qRes, aRes] = await Promise.all([
      axios.get(`http://localhost:8003/api/question/${id}`),
      axios.get(`http://localhost:8004/api/answer/${id}`)
    ]);

    return NextResponse.json({ 
      question: qRes.data, 
      answers: Array.isArray(aRes.data) ? aRes.data : [] 
    });
  } catch (error: any) {
    console.error("GET Route Error:", error.response?.data || error.message);
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Await the params
    const { content } = await req.json();
    
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return NextResponse.json({ message: "No token" }, { status: 401 });

    const res = await axios.post(
      `http://localhost:8004/api/answer/${id}`, 
      { content }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("POST Route Error:", error.response?.data || error.message);
    return NextResponse.json({ message: "Submission failed" }, { status: 500 });
  }
}