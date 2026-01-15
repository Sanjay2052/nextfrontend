"use client";

import PostCard from "@/components/PostCard";
import axios from "axios";
import { Code2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [post, setPost] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null); // Store logged in user

  useEffect(() => {
    fetchData();
    fetchCurrentUser(); // Fetch who is logged in
  }, []);

  // Fetch all posts from Post Service (8006)
  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8006/api/post");
      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  }

async function fetchCurrentUser() {
  try {
    const response = await axios.get("http://localhost:8002/api/user/profile", {
      withCredentials: true // This MUST be here to send the cookie
    });
    console.log("Logged in user:", response.data); // <--- Add this log
    setCurrentUser(response.data);
  } catch (error) {
    console.log("Cookie fetch failed:", error.response?.data || error.message);
    setCurrentUser(null);
  }
}

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8 px-2">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="text-indigo-600" /> DevFeed
          </h1>
          <button onClick={()=>router.push('/post/add')} className="bg-indigo-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-indigo-700 shadow-md transition-all">
            New Post
          </button>
        </div>

        {post.map((p, index) => (
          <PostCard 
            key={p._id || index} 
            post={p} 
            currentUserId={currentUser?._id} // PASS THE ID HERE
          />
        ))}
        
      </div>
    </div>
  );
}