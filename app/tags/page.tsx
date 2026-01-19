"use client";

import React, { useState, useMemo } from 'react';

// --- MOCK DATA ---
const TAGS_DATA = [
  { id: '1', name: 'javascript', count: 24500, desc: 'For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations.' },
  { id: '2', name: 'python', count: 18200, desc: 'Python is a multi-paradigm, dynamically typed, multipurpose programming language.' },
  { id: '3', name: 'java', count: 15400, desc: "Java is a high-level object oriented programming language. Use this tag when you're having problems with your Java code." },
  { id: '4', name: 'c#', count: 12100, desc: "C# (pronounced 'see sharp') is a high level, statically typed, multi-paradigm programming language developed by Microsoft." },
  { id: '5', name: 'php', count: 10500, desc: 'PHP is a widely used, open source, general-purpose scripting language. It was originally designed for web development.' },
  { id: '6', name: 'android', count: 9800, desc: "Android is Google's mobile operating system, used for programming mobile apps." },
  { id: '7', name: 'html', count: 8900, desc: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages and other information.' },
  { id: '8', name: 'jquery', count: 8500, desc: 'jQuery is a JavaScript library. Consider also adding the JavaScript tag.' },
  { id: '9', name: 'c++', count: 7600, desc: 'C++ is a general-purpose programming language. It has imperative, object-oriented and generic programming features.' },
  { id: '10', name: 'css', count: 7200, desc: 'CSS is a style sheet language used for describing the presentation of a document written in a markup language.' },
  { id: '11', name: 'ios', count: 6500, desc: 'iOS is the mobile operating system running on the Apple iPhone, iPod touch, and iPad.' },
  { id: '12', name: 'sql', count: 6100, desc: 'Structured Query Language (SQL) is a language for querying databases.' },
];

export default function DevAskTagsPage() {
  const [search, setSearch] = useState("");

  // Memoized filter for performance
  const filteredTags = useMemo(() => {
    return TAGS_DATA.filter(tag => 
      tag.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-100">
      

      <nav className="border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-[#3B82F6] text-white p-1.5 rounded-md">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">DevAsk</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Questions</a>
            <a href="#" className="text-blue-600">Tags</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Users</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block relative">
            <input 
              type="text" 
              placeholder="Search questions..." 
              className="bg-gray-50 border border-gray-200 rounded-md py-1.5 pl-3 pr-10 text-sm w-64 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <button className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2">Log in</button>
          <button className="text-sm font-semibold bg-[#3B82F6] text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all shadow-sm active:scale-95">Sign up</button>
        </div>
      </nav>

      {/* --- MAIN PAGE BODY --- */}
      <main className="flex-grow max-w-[1280px] mx-auto w-full px-4 md:px-8 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Tags</h1>
          <p className="text-gray-500 text-[16px] max-w-2xl leading-relaxed">
            A tag is a keyword or label that categorizes your question with other, similar questions. 
            Using the right tags makes it easier for others to find and answer your question.
          </p>
        </header>

        {/* Filter Input */}
        <div className="mb-10 relative max-w-sm">
          <input
            type="text"
            placeholder="Filter by tag name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm placeholder:text-gray-400"
          />
        </div>

        {/* Tags Grid */}
        {filteredTags.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTags.map((tag) => (
              <div key={tag.name} className="group border border-gray-100 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col h-full bg-white">
                <div className="flex-grow">
                  <div className="mb-4">
                    <span className="inline-block bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 px-3 py-1 rounded-md text-xs font-semibold tracking-wide transition-colors uppercase">
                      {tag.name}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-4">
                    {tag.desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">
                    {tag.count.toLocaleString()} questions
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-3xl">
            <h3 className="text-gray-400 font-medium">No tags match "{search}"</h3>
            <button onClick={() => setSearch("")} className="mt-2 text-blue-500 text-sm hover:underline">Clear search</button>
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 font-bold text-xl mb-6">
              <div className="bg-blue-600 text-white p-1.5 rounded-md">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              DevAsk
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              A community-driven platform for developers to learn, share knowledge, and build their careers.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="text-gray-500 text-sm space-y-4">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Questions</a></li>
              <li><a href="#" className="text-blue-600 font-semibold">Tags</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Users</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Ask a Question</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="text-gray-500 text-sm space-y-4">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4">
              {['github', 'twitter', 'linkedin'].map((social) => (
                <div key={social} className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all cursor-pointer group">
                  <div className="w-5 h-5 bg-gray-300 group-hover:bg-blue-400 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="max-w-[1280px] mx-auto mt-20 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-400 text-xs tracking-wide">© 2026 DevAsk Community. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}