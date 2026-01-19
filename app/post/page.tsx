"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import PostCard from "@/components/PostCard";
import { 
  Code2, 
  TrendingUp, 
  Hash, 
  Users, 
  MapPin, 
  Link as LinkIcon, 
  Calendar,
  LogOut
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchCurrentUser();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8006/api/post");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCurrentUser() {
    try {
      const response = await axios.get("http://localhost:8002/api/user/profile", {
        withCredentials: true 
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.log("Not logged in");
      setCurrentUser(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar / Top Bar (Mobile mostly, but visible on all) */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="text-indigo-600" /> DevFeed
          </h1>
          {/* Mobile "New Post" Button (Visible only on small screens) */}
          <button 
            onClick={() => router.push('/post/add')} 
            className="lg:hidden bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold"
          >
            Post
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* -----------------------------------------------------------------------
             LEFT SIDEBAR - User Profile & Navigation 
             (Hidden on mobile, spans 3 cols on desktop)
          ------------------------------------------------------------------------ */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              
              {/* Mini Profile Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="px-5 pb-5">
                  <div className="relative -mt-10 mb-3">
                    <div className="w-20 h-20 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center text-2xl font-bold text-slate-500">
                      {currentUser ? currentUser.username?.[0].toUpperCase() : "?"}
                    </div>
                  </div>
                  
                  {currentUser ? (
                    <>
                      <h2 className="font-bold text-lg text-slate-800">{currentUser.username}</h2>
                      <p className="text-slate-500 text-sm">@{currentUser.username}</p>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-sm">
                        <div className="text-center">
                          <span className="block font-bold text-slate-800">120</span>
                          <span className="text-slate-500 text-xs">Post</span>
                        </div>
                        <div className="text-center">
                          <span className="block font-bold text-slate-800">4.5k</span>
                          <span className="text-slate-500 text-xs">Followers</span>
                        </div>
                        <div className="text-center">
                          <span className="block font-bold text-slate-800">180</span>
                          <span className="text-slate-500 text-xs">Following</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-slate-500 mb-3">Join the community</p>
                      <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold text-sm">Sign In</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Links (Mock) */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <nav className="space-y-1">
                  <NavItem icon={<Users size={18} />} label="My Community" />
                  <NavItem icon={<Calendar size={18} />} label="Events" />
                  <NavItem icon={<LinkIcon size={18} />} label="Saved Resources" />
                </nav>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
             CENTER FEED - Main Content
             (Spans full width on mobile, 6 cols on desktop)
          ------------------------------------------------------------------------ */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Create Post Prompt */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex gap-4 items-center cursor-pointer hover:bg-slate-50 transition" onClick={() => router.push('/post/add')}>
              <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0"></div>
              <div className="flex-grow bg-slate-100 rounded-full h-10 px-4 flex items-center text-slate-500 text-sm">
                Start a new post...
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-indigo-700">
                Post
              </button>
            </div>

            {/* Posts Feed */}
            {loading ? (
              <div className="text-center py-10 text-slate-500">Loading feed...</div>
            ) : posts.length > 0 ? (
              posts.map((p, index) => (
                <PostCard 
                  key={p._id || index} 
                  post={p} 
                  currentUserId={currentUser?._id}
                />
              ))
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-slate-200">
                <p className="text-slate-500">No posts yet. Be the first!</p>
              </div>
            )}
          </div>

          {/* -----------------------------------------------------------------------
             RIGHT SIDEBAR - "User Bait" / Discovery
             (Hidden on mobile, spans 3 cols on desktop)
          ------------------------------------------------------------------------ */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              
              {/* Feature 1: Trending Topics */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                  <TrendingUp size={18} className="text-indigo-600" /> Trending Devs
                </h3>
                <div className="space-y-4">
                  <TrendingItem tag="#NextJS14" count="24k posts" />
                  <TrendingItem tag="#RustLang" count="18k posts" />
                  <TrendingItem tag="#AI_Agents" count="12k posts" />
                  <TrendingItem tag="#WebAssembly" count="8.5k posts" />
                </div>
              </div>

              {/* Feature 2: Who to Follow (Suggestions) */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                <h3 className="font-bold text-slate-800 mb-4">Who to follow</h3>
                <div className="space-y-4">
                  <SuggestionUser name="Sarah Dev" handle="@sarahcodes" />
                  <SuggestionUser name="Tech Ninja" handle="@ninja_js" />
                  <SuggestionUser name="Alex Design" handle="@ui_alex" />
                </div>
                <button className="w-full mt-4 text-indigo-600 text-sm font-semibold hover:underline">
                  Show more
                </button>
              </div>

              {/* Footer Links */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400 px-2">
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Accessibility</a>
                <a href="#" className="hover:underline">Help Center</a>
                <a href="#" className="hover:underline">Privacy & Terms</a>
                <span>© 2024 DevFeed</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Small Helper Components to keep the main code clean
// ------------------------------------------------------------------

function NavItem({ icon, label }: { icon: any, label: string }) {
  return (
    <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </a>
  );
}

function TrendingItem({ tag, count }: { tag: string, count: string }) {
  return (
    <div className="cursor-pointer group">
      <p className="font-bold text-slate-700 text-sm group-hover:text-indigo-600">{tag}</p>
      <p className="text-xs text-slate-400">{count}</p>
    </div>
  );
}

function SuggestionUser({ name, handle }: { name: string, handle: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-slate-200"></div>
        <div className="leading-none">
          <p className="font-bold text-slate-800 text-sm">{name}</p>
          <p className="text-xs text-slate-500">{handle}</p>
        </div>
      </div>
      <button className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-full font-medium hover:bg-slate-800">
        Follow
      </button>
    </div>
  );
}