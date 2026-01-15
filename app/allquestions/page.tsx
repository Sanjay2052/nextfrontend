'use client'

import React, { use, useEffect, useState } from 'react';
import { Search, Filter, Github, Twitter, Linkedin } from 'lucide-react';
import axios from 'axios';

// Types
interface Question {
  id: number;
  title: string;
  tags: string[];
  description: string;
  userId: string;
  views: number;
  votes: number;
  askedTime: string;
  lastActivity: Date;
  hasAcceptedAnswer: boolean;
}

interface Tag {
  name: string;
  count: number;
}

type FilterType = 'newest' | 'active' | 'unanswered';

const QuestionsPage: React.FC = () => {
  // const [activeFilter, setActiveFilter] = useState<FilterType>('newest');
  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const [allquestions,setallquestions]=useState([])


  // async function fetchallquestions(){
  //   let response=await axios.get("http://localhost:8003/api/question")
  //   setallquestions(response.data)
  // }

  // const allQuestions: Question[] = [
  //   {
  //     id: 1,
  //     votes: 45,
  //     answers: 12,
  //     views: 1205,
  //     title: 'How to implement authentication with React and Node.js?',
  //     excerpt: "I'm trying to build a secure authentication system using JWT tokens. I have the backend set up but I'm struggling with storing the token securely on the frontend...",
  //     tags: ['react', 'node.js', 'authentication', 'jwt'],
  //     author: 'Sarah Chen',
  //     authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  //     askedTime: '2 hours ago',
  //     lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
  //     hasAcceptedAnswer: false
  //   },
  //   {
  //     id: 2,
  //     votes: 32,
  //     answers: 5,
  //     views: 850,
  //     title: 'Understanding useEffect dependency array behavior',
  //     excerpt: "My effect is running in an infinite loop even though I think I've set the dependencies correctly. Here is my code snippet...",
  //     tags: ['react', 'hooks', 'javascript'],
  //     author: 'Mike Ross',
  //     authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  //     askedTime: '4 hours ago',
  //     lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000),
  //     hasAcceptedAnswer: false
  //   },
  //   {
  //     id: 3,
  //     votes: 128,
  //     answers: 24,
  //     views: 5400,
  //     title: 'Best practices for CSS Grid vs Flexbox',
  //     excerpt: "When should I use Grid over Flexbox? I understand the basic difference (2D vs 1D) but in practice I find myself using Flexbox for everything...",
  //     tags: ['css', 'grid', 'flexbox', 'layout'],
  //     author: 'Emma Wilson',
  //     authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  //     askedTime: '1 day ago',
  //     lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
  //     hasAcceptedAnswer: true
  //   },
  //   {
  //     id: 4,
  //     votes: 56,
  //     answers: 8,
  //     views: 1100,
  //     title: 'TypeScript generic type inference issue',
  //     excerpt: "I have a generic function that should infer the return type based on the input, but it keeps returning 'any'. How can I fix this?",
  //     tags: ['typescript', 'generics'],
  //     author: 'Type Master',
  //     authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  //     askedTime: '3 days ago',
  //     lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  //     hasAcceptedAnswer: false
  //   },
  //   {
  //     id: 5,
  //     votes: 89,
  //     answers: 0,
  //     views: 2300,
  //     title: 'How to optimize React rendering performance?',
  //     excerpt: "My React app is getting slow with large lists. I've tried useMemo and React.memo but still seeing performance issues. What am I missing?",
  //     tags: ['react', 'performance', 'optimization'],
  //     author: 'Alex Turner',
  //     authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  //     askedTime: '5 hours ago',
  //     lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000),
  //     hasAcceptedAnswer: false
  //   },
  //   {
  //     id: 6,
  //     votes: 23,
  //     answers: 0,
  //     views: 456,
  //     title: 'Next.js 14 server actions best practices',
  //     excerpt: "What are the recommended patterns for using server actions in Next.js 14? Should I use them for all server-side operations?",
  //     tags: ['next.js', 'server-actions', 'react'],
  //     author: 'David Kim',
  //     authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
  //     askedTime: '1 hour ago',
  //     lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
  //     hasAcceptedAnswer: false
  //   }
  // ];

  // const popularTags: Tag[] = [
  //   { name: 'javascript', count: 1240 },
  //   { name: 'react', count: 980 },
  //   { name: 'python', count: 850 },
  //   { name: 'java', count: 720 },
  //   { name: 'css', count: 650 },
  //   { name: 'node.js', count: 540 }
  // ];

  // const getFilteredQuestions = (): Question[] => {
  //   let filtered = [...allQuestions];

  //   if (activeFilter === 'newest') {
  //     filtered.sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
  //   } else if (activeFilter === 'active') {
  //     filtered.sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
  //   } else if (activeFilter === 'unanswered') {
  //     filtered = filtered.filter(q => q.answers === 0);
  //   }

  //   if (searchQuery) {
  //     filtered = filtered.filter(q => 
  //       q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  //     );
  //   }

  //   return filtered;
  // };

  //const filteredQuestions = getFilteredQuestions();


  let [allquestions, setallquestions] = useState<Question[]>([])
  let [alltag, settag] = useState([])


  useEffect(() => {

    let fetchquestion = async () => {

      try {
        let response = await axios.get("http://localhost:8003/api/question")
        let data = response.data
        console.log("data:", data);
        setallquestions(data)
      } catch (error) {
        console.error(error);

      }

    }
    fetchquestion()
  }, [])


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-mono text-sm">&lt;/&gt;</span>
                </div>
                <span className="text-xl font-bold text-gray-900">DevAsk</span>
              </div>
              <nav className="flex space-x-6">
                <a href="#" className="text-gray-900 font-medium">Questions</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Tags</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Users</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search questions..."

                  className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
              <button className="text-gray-600 hover:text-gray-900">Log in</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Questions List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">All Questions</h1>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Ask Question
              </button>
            </div>

            {/* Filter Tabs
            <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveFilter('newest')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === 'newest'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setActiveFilter('active')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === 'active'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveFilter('unanswered')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === 'unanswered'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Unanswered
                </button>
                <button className="ml-auto flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
              </div>
            </div> */}

            {/* Questions */}
            <div className="space-y-4">
              {allquestions.map((question) => (
                <div
                  key={question.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-6">

                    {/* Stats */}
                    <div className="flex flex-col items-center space-y-4 text-sm min-w-24">
                      <div className="text-center">
                        <div className="text-xl font-semibold text-gray-900">
                          {question.votes}
                        </div>
                        <div className="text-gray-600">votes</div>
                      </div>

                      <div className="text-center">
                        <div
                          className={`text-xl font-semibold ${question.hasAcceptedAnswer
                              ? "text-green-600"
                              : "text-gray-900"
                            }`}
                        >
                          {question.hasAcceptedAnswer ? "✔" : "—"}
                        </div>
                        <div className="text-gray-600">accepted</div>
                      </div>

                      <div className="text-center">
                        <div className="text-xl font-semibold text-gray-900">
                          {question.views}
                        </div>
                        <div className="text-gray-600">views</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <a
                        href="#"
                        className="text-xl font-medium text-blue-600 hover:text-blue-700 mb-2 block"
                      >
                        {question.title}
                      </a>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {question.description}
                      </p>

                      <div className="flex items-center justify-between">

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {question.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 cursor-pointer"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta info */}
                        <div className="text-sm text-gray-500">
                          asked {question.askedTime} • user {question.userId}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            {/* {filteredQuestions.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600 text-lg">No questions found matching your criteria.</p>
              </div>
            )} */}
          </div>
          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h2>
              {/* <div className="space-y-3">
                {popularTags.map((tag, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 cursor-pointer">
                      {tag.name}
                    </span>
                    <span className="text-sm text-gray-600">× {tag.count}</span>
                  </div>
                ))}
              </div> */}
              <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                View all tags →
              </button>
            </div>

            {/* Custom Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Custom Filter</h2>
              <p className="text-gray-600 text-sm mb-4">
                Create a custom filter to see only the questions you're interested in.
              </p>
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Create Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-mono text-sm">&lt;/&gt;</span>
                </div>
                <span className="text-xl font-bold text-gray-900">DevAsk</span>
              </div>
              <p className="text-gray-600 text-sm">
                A community-driven platform for developers to learn, share knowledge, and build their careers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Questions</a></li>
                <li><a href="#" className="hover:text-gray-900">Tags</a></li>
                <li><a href="#" className="hover:text-gray-900">Users</a></li>
                <li><a href="#" className="hover:text-gray-900">Ask a Question</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Github className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
                <Linkedin className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuestionsPage;