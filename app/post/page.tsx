import PostCard from '@/components/PostCard';
import axios from 'axios';
import { Code2 } from 'lucide-react'
import { useEffect, useState } from 'react';
const MOCK_POSTS = [
    {
        author: {
            name: "Sarah Code",
            handle: "sarah_dev",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        },
        timestamp: "2h ago",
        content: "I just discovered a cleaner way to handle async errors in Node.js without using try-catch blocks everywhere. Check out this middleware pattern! 🚀",
        language: "JavaScript",
        filename: "errorHandler.js",
        code: "const catchAsync = fn => (req, res, next) => {\n  Promise.resolve(fn(req, res, next)).catch(next);\n};\n\nexport const getUser = catchAsync(async (req, res) => {\n  const user = await User.findById(req.params.id);\n  res.status(200).json(user);\n});",
        tags: ["nodejs", "backend", "javascript", "cleanCode"],
        comments: 24,
        reposts: 8,
        likes: 142
    },
    {
        author: {
            name: "Marcus Aurelius",
            handle: "system_design",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
        },
        timestamp: "5h ago",
        content: "Quick reminder: The best code is the code you didn't have to write. Keep your abstractions simple and your data flow predictable.",
        tags: ["programming", "philosophy", "productivity"],
        comments: 5,
        reposts: 12,
        likes: 89
    }
];

let [post,setpost]=useState([])


useEffect(() => {
    try {
        fetchdata()
    } catch (error) {
        console.error(error);

    }
}, [])
async function fetchdata() {
    try {
        let dataa = await axios.get("http://localhost:8005/api/post")
        let res=dataa.data
        return setpost(res)
    } catch (error) {
        console.error(error);

    }

}

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            {/* Centered Column */}
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8 px-2">
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Code2 className="text-indigo-600" /> DevFeed
                    </h1>
                    <button className="bg-indigo-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-indigo-700 shadow-md transition-all">
                        New Post
                    </button>
                </div>

            {post.map((post,index)=>(
                <PostCard key={index} post={post} />
            ))}
            </div>
        </div>
    );
}

//  {MOCK_POSTS.map((post, index) => (
//                     <PostCard key={index} post={post} />
//  ))}