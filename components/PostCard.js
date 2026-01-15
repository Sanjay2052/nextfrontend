import axios from 'axios';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, Smile } from 'lucide-react';
import { useEffect, useState } from 'react';

// --- SUB-COMPONENT: COMMENT ITEM ---
function CommentItem({ comment }) {
  const [commentUser, setCommentUser] = useState(null);

  useEffect(() => {
    if (comment.userid) {
      axios.get(`http://localhost:8002/api/user/finduser/${comment.userid}`)
        .then(res => setCommentUser(res.data))
        .catch(err => console.error("Error fetching commenter:", err));
    }
  }, [comment.userid]);

  return (
    <div className="flex gap-3 items-start animate-in fade-in duration-500">
      <img
        src={commentUser?.avatar ? `http://localhost:8002/uploads/${commentUser.avatar}` : "/default-avatar.png"}
        className="w-8 h-8 rounded-full object-cover border border-slate-100"
        alt="avatar"
      />
      <div className="flex-1 bg-indigo-50/60 rounded-2xl rounded-tl-none p-3 border border-indigo-100/50 shadow-sm">
        <p className="text-[12px] font-bold text-indigo-900 mb-0.5">{commentUser?.name || "..."}</p>
        <p className="text-sm text-slate-700 leading-snug">{comment.commentText}</p>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT: POST CARD ---
export default function PostCard({ post, currentUserId }) {
  const [user, setUser] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  
  // Initialize likes from post data (ensure it is an array)
  const [likesArray, setLikesArray] = useState(Array.isArray(post.likes) ? post.likes : []);

  // Check if current user has liked
  const isLiked = currentUserId ? likesArray.includes(currentUserId) : false;

  // Fetch Author Details
  useEffect(() => {
    if (post.userid) {
      axios.get(`http://localhost:8002/api/user/finduser/${post.userid}`).then(res => setUser(res.data));
    }
  }, [post.userid]);

  // Fetch Comments when section is opened
  useEffect(() => {
    if (showComments) {
      axios.get(`http://localhost:8006/api/post/comments/${post._id}`).then(res => setComments(res.data));
    }
  }, [showComments, post._id]);

  // Handle Like/Unlike Toggle
  const handleLike = async () => {
    if (!currentUserId) return alert("Please login to like!");

    try {
      const res = await axios.post(`http://localhost:8006/api/post/like/${post._id}`, {}, { withCredentials: true });
      
      if (res.data.liked) {
        setLikesArray(prev => [...prev, currentUserId]); // Add ID to UI
      } else {
        setLikesArray(prev => prev.filter(id => id !== currentUserId)); // Remove ID from UI
      }
    } catch (err) {
      console.error("Like Error", err);
    }
  };

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(`http://localhost:8006/api/post/comment/${post._id}`, { commentText }, { withCredentials: true });
      setComments(prev => [res.data, ...prev]);
      setCommentText("");
    } catch (err) { console.error(err); }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm mb-6 overflow-hidden transition-all">
      <div className="p-4 sm:p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={user?.avatar ? `http://localhost:8002/uploads/${user.avatar}` : "/default-avatar.png"} className="w-12 h-12 rounded-full border-2 border-slate-50 object-cover" />
            <div>
              <h3 className="font-bold text-slate-900">{user?.name || "..."}</h3>
              <p className="text-xs font-semibold text-indigo-500 uppercase">{user?.role || "User"}</p>
            </div>
          </div>
          <MoreHorizontal className="text-slate-400 cursor-pointer" />
        </div>

        {/* Post Content */}
        <div className="text-slate-800 mb-4 whitespace-pre-wrap">{post.description}</div>
        {post.filename && <img src={`http://localhost:8006/uploads/${post.filename}`} className="w-full rounded-xl border mb-4" />}

        {/* Interaction Bar */}
        <div className="flex items-center justify-between py-2 border-t border-b border-slate-50">
          <div className="flex gap-4">
            <button onClick={() => setShowComments(!showComments)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${showComments ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}>
              <MessageCircle size={20} />
              <span className="text-sm font-bold">{comments.length || post.comment?.length || 0}</span>
            </button>

            <button onClick={handleLike} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${isLiked ? 'bg-red-50 text-red-500' : 'text-slate-500 hover:bg-slate-50'}`}>
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-sm font-bold">{likesArray.length}</span>
            </button>
          </div>
          <Share2 size={20} className="text-slate-400 hover:text-indigo-500 cursor-pointer" />
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 space-y-4 animate-in slide-in-from-top-2">
            <div className="max-h-60 overflow-y-auto space-y-4 pr-1">
              {comments.length === 0 ? <p className="text-center text-slate-400 text-sm py-2">No comments yet</p> : 
                comments.map(c => <CommentItem key={c._id} comment={c} />)}
            </div>
            <form onSubmit={handleSendComment} className="flex gap-2 pt-2 border-t">
              <input type="text" placeholder="Add a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-slate-100 rounded-full py-2 px-4 text-sm outline-none text-indigo-900" />
              <button type="submit" disabled={!commentText.trim()} className="p-2 bg-indigo-600 text-white rounded-full"><Send size={18} /></button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}