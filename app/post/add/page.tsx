"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  X, 
  Send, 
  Image as ImageIcon, 
  Loader2, 
  ChevronLeft,
  Smile
} from "lucide-react";

export default function CreatePost() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Clean up object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!description.trim()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      await axios.post("http://localhost:8006/api/post", formData, {
        withCredentials: true,
      });

      router.push("/post");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while posting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      {/* Main Card Container */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <button 
            onClick={() => router.back()} 
            className="p-2 -ml-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>

          <h1 className="text-lg font-bold text-slate-800">Create Post</h1>

          <div className="w-8"></div> {/* Spacer for centering title */}
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="flex gap-4">
            {/* User Avatar Placeholder (Optional - adds realism) */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                ME
              </div>
            </div>

            <div className="flex-grow">
              <textarea
                placeholder="What's happening?"
                className="w-full text-lg text-slate-700 placeholder:text-slate-400 border-none focus:ring-0 resize-none min-h-[120px] bg-transparent p-0 leading-relaxed"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* Image Preview Area */}
              {imagePreview && (
                <div className="relative mt-4 rounded-xl overflow-hidden group border border-slate-200">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full max-h-[400px] object-cover"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer / Actions */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Image Upload Trigger */}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors flex items-center justify-center"
              title="Add Image"
            >
              <ImageIcon size={22} />
            </button>
            
            {/* Placeholder for future features like emojis */}
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <Smile size={22} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Character Count (Optional UI polish) */}
            <span className={`text-xs ${description.length > 200 ? 'text-orange-500' : 'text-slate-400'}`}>
              {description.length} chars
            </span>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!description.trim() || loading}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200
                ${(!description.trim() || loading) 
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                  : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95"}
              `}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <span>Post</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}