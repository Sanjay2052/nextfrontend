import { Heart, MessageCircle, Repeat2, Share2, MoreHorizontal, Terminal, Code2 } from 'lucide-react';

export default function PostCard({ post }) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm mb-6 overflow-hidden transition-all hover:border-indigo-300">
      <div className="p-4 sm:p-6">
        {/* User Info Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-12 h-12 rounded-full border border-slate-100 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-tight hover:underline cursor-pointer">
                {post.author.name}
              </h3>
              <p className="text-sm text-slate-500">@{post.author.handle} · {post.timestamp}</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Post Content Text */}
        <div className="text-slate-800 text-[16px] leading-relaxed mb-4 whitespace-pre-wrap">
          {post.content}
        </div>

        {/* Developer Feature: Code Snippet */}
        {post.code && (
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117] my-4 shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-indigo-400" />
                <span className="text-xs font-mono text-slate-400">{post.filename || 'script.js'}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{post.language}</span>
            </div>
            <pre className="p-5 overflow-x-auto text-sm font-mono text-indigo-100 leading-relaxed">
              <code>{post.code}</code>
            </pre>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags?.map((tag) => (
            <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors">
              #{tag}
            </span>
          ))}
        </div>

        {/* Social Action Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button className="flex items-center gap-2 group text-slate-500 hover:text-indigo-600 transition-colors">
            <div className="p-2 group-hover:bg-indigo-50 rounded-full">
              <MessageCircle size={20} />
            </div>
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button className="flex items-center gap-2 group text-slate-500 hover:text-emerald-500 transition-colors">
            <div className="p-2 group-hover:bg-emerald-50 rounded-full">
              <Repeat2 size={20} />
            </div>
            <span className="text-sm font-medium">{post.reposts}</span>
          </button>

          <button className="flex items-center gap-2 group text-slate-500 hover:text-rose-500 transition-colors">
            <div className="p-2 group-hover:bg-rose-50 rounded-full">
              <Heart size={20} />
            </div>
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <button className="flex items-center gap-2 group text-slate-500 hover:text-slate-900 transition-colors">
            <div className="p-2 group-hover:bg-slate-100 rounded-full">
              <Share2 size={20} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}