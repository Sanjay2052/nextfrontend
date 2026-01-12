"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Terminal, Code2, Send, Image as ImageIcon, Hash } from 'lucide-react';

export default function CreatePost() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [showCodeInput, setShowCodeInput] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <button 
            onClick={() => router.back()}
            className="text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors"
          >
            <X size={20} />
            <span className="font-medium">Cancel</span>
          </button>
          <h1 className="text-xl font-bold text-slate-900">Create Post</h1>
          <button 
            disabled={!content}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-indigo-700 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send size={16} />
            Post
          </button>
        </div>

        {/* Main Composer Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex gap-4">
              {/* User Avatar */}
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                className="w-12 h-12 rounded-full border border-slate-100"
                alt="Your Avatar"
              />
              
              <div className="flex-1">
                {/* Text Area */}
                <textarea
                  placeholder="What's the latest project? Share a snippet or a bug you fixed..."
                  className="w-full text-lg text-slate-800 placeholder-slate-400 border-none focus:ring-0 resize-none min-h-[120px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                {/* Code Snippet Input Area */}
                {showCodeInput ? (
                  <div className="mt-4 rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117] animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-indigo-400" />
                        <select 
                          className="bg-transparent text-xs font-mono text-slate-400 border-none focus:ring-0 cursor-pointer p-0"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        >
                          <option value="javascript">javascript</option>
                          <option value="typescript">typescript</option>
                          <option value="python">python</option>
                          <option value="rust">rust</option>
                        </select>
                      </div>
                      <button 
                        onClick={() => setShowCodeInput(false)}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <textarea
                      placeholder="// Paste your code here..."
                      className="w-full p-5 bg-transparent text-sm font-mono text-indigo-100 border-none focus:ring-0 resize-none min-h-[150px]"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                ) : null}

                {/* Toolbar */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowCodeInput(!showCodeInput)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${showCodeInput ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-slate-100 text-slate-500'}`}
                    >
                      <Code2 size={18} />
                      <span className="text-sm font-semibold">Code Snippet</span>
                    </button>
                    
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                      <ImageIcon size={18} />
                    </button>
                    
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                      <Hash size={18} />
                    </button>
                  </div>
                  
                  <div className="text-xs text-slate-400 font-medium">
                    {content.length} / 500
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 px-4 py-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Developer Tip</h4>
          <p className="text-sm text-indigo-700 leading-snug">
            Posts with code snippets get 40% more engagement from the community. Don't forget to include a brief explanation!
          </p>
        </div>
      </div>
    </div>
  );
}