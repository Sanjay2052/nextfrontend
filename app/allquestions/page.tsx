"use client";

import React, { useEffect, useState } from 'react';
import { 
  Search, Github, Twitter, Linkedin, 
  MessageSquare, TrendingUp, UserPlus, ExternalLink,
  Award, Flame, ChevronRight
} from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function QuestionsPage() {
  const router = useRouter();
  const [allquestions, setallquestions] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);



  
  useEffect(() => {
    fetchQuestions();
    fetchUser();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8003/api/question");
      setallquestions(response.data);
    } catch (error) { console.error(error); }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8002/api/user/profile", { withCredentials: true });
      setCurrentUser(response.data);
    } catch (e) { setCurrentUser(null); }
  };
  // console.log("currentUser:",currentUser);
  

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER - Fixed at top */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-mono text-xs font-bold">&lt;/&gt;</span>
            </div>
            <span className="text-lg font-bold text-slate-900">DevAsk</span>
          </div>
          
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search 'use client' issues..."
                className="w-full pl-10 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
             {currentUser ? (
                <div className="flex items-center gap-2">
                   <span className="text-sm font-medium text-slate-700 hidden sm:block">{currentUser.name}</span>
                   <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                    {currentUser.name?.[0].toUpperCase()}
                   </div>
                </div>
             ) : (
               <button className="text-sm font-bold text-indigo-600 px-4 py-2 hover:bg-indigo-50 rounded-lg">Log in</button>
             )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT SIDEBAR - STICKY */}
          <aside className="hidden lg:block w-64 sticky top-20">
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3 border border-indigo-100">
                    <Award size={32} />
                  </div>
                  <h3 className="font-bold text-slate-900 leading-tight">Elite Contributor</h3>
                  <p className="text-xs text-slate-500 mt-1">Reputation: 1,420</p>
                  <button className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                    <UserPlus size={14} /> Connect
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <nav className="space-y-1">
                  <SidebarLink icon={<MessageSquare size={18} />} label="All Questions" active />
                  <SidebarLink icon={<Flame size={18} />} label="Trending Now" />
                  <SidebarLink icon={<Award size={18} />} label="Badges" />
                </nav>
              </div>
            </div>
          </aside>

          {/* CENTRE CONTENT - SCROLLABLE */}
          <main className="flex-1 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Questions</h1>
                <p className="text-sm text-slate-500">{allquestions.length} results found</p>
              </div>
              <button 
                onClick={() => router.push('/addquestion')}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold text-sm transition-all shadow-lg shadow-indigo-100"
              >
                Ask Question
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-4 pb-20">
              {allquestions.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>
          </main>

          {/* RIGHT SIDEBAR - STICKY */}
          <aside className="hidden lg:block w-72 sticky top-20">
            <div className="space-y-6">
              {/* Trending Questions about 'use client' */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={20} className="text-indigo-400" />
                  <h2 className="text-md font-bold uppercase tracking-wider">Top Trends</h2>
                </div>
                
                <div className="space-y-5">
                  <TrendingItem 
                    title="When to use 'use client' in Next.js 15?" 
                    stats="4.2k views • 12 replies"
                  />
                  <TrendingItem 
                    title="Prop drilling vs 'use client' Context" 
                    stats="2.1k views • 8 replies"
                  />
                  <TrendingItem 
                    title="The ultimate guide to Server Components" 
                    stats="8k views • 45 replies"
                  />
                </div>

                <button className="w-full mt-6 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-xl text-xs font-bold transition-all">
                  View Discussion Board
                </button>
              </div>

              {/* Connect Socials */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase">Join Socials</h3>
                <div className="grid grid-cols-3 gap-2">
                  <SocialBox icon={<Github size={18} />} label="Git" />
                  <SocialBox icon={<Twitter size={18} />} label="X" />
                  <SocialBox icon={<Linkedin size={18} />} label="In" />
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

// --- HELPERS ---

function SidebarLink({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all ${active ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}

function TrendingItem({ title, stats }: { title: string, stats: string }) {
  return (
    <div className="group cursor-pointer border-l-2 border-indigo-500/30 pl-3 hover:border-indigo-400 transition-all">
      <p className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 line-clamp-2">
        {title}
      </p>
      <p className="text-[10px] text-slate-400 mt-1 uppercase">{stats}</p>
    </div>
  );
}


function QuestionCard({ question }: { question: any }) {

  const [authorName, setAuthorName] = useState<string>("Loading...");

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.get(`http://localhost:8002/api/user/profile`,{
          withCredentials:true
        }); 
        console.log("asked user:",res.data.name);
        
        setAuthorName(res.data.name);
      } catch (e) {
        setAuthorName("Unknown User");
      }
    };
    fetchAuthor();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-indigo-200 transition-all hover:shadow-md">
      <div className="flex gap-5">
        <div className="hidden sm:flex flex-col items-center justify-center bg-slate-50 rounded-xl px-4 py-2 border border-slate-100 h-fit">
          <span className="text-lg font-black text-slate-800">{question.votes || 0}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Votes</span>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer mb-2">
            {question.title}
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags?.map((tag: string) => (
              <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md">
                #{tag.toUpperCase()}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-600 italic">Asked by {authorName  }</span>
              <span>•</span>
              <span>{new Date(question.createdAt).toLocaleDateString()}</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialBox({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-all border border-transparent hover:border-indigo-100">
      {icon}
      <span className="text-[10px] font-bold mt-1 uppercase">{label}</span>
    </div>
  );
}