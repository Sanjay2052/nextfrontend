"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { X, Code2, Send, Image as ImageIcon } from "lucide-react";

export default function CreatePost() {
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("description", description);

      if (image) {
        formData.append("image", image); 
      }

await axios.post(
  "http://localhost:8006/api/post",
  formData,
  {
    withCredentials: true, 
  }
);



      router.push("/post");
    } catch (error) {
      console.error(error);
      alert("Post upload failewwwwwwwd");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <button onClick={() => router.back()} className="text-slate-500">
            <X size={20} /> Cancel
          </button>

          <h1 className="text-xl font-bold">Create Post</h1>

          <button
            onClick={handleSubmit}
            disabled={!description || loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold text-sm disabled:opacity-50 flex items-center gap-2"
          >
            <Send size={16} />
            {loading ? "Posting..." : "Post"}
          </button>
        </div>

        {/* Card */}
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <textarea
            placeholder="What's on your mind?"
            className="w-full text-lg resize-none min-h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Image Upload */}
          <div className="mt-4 flex items-center gap-4">
            <label className="cursor-pointer flex items-center gap-2 text-slate-600 hover:text-indigo-600">
              <ImageIcon size={20} />
              <span>Add Image</span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </label>

            {image && (
              <span className="text-xs text-slate-500">
                {image.name}
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
