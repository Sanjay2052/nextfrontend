"use client"
import { useState, useEffect } from 'react';
import { MapPin, Calendar, Link, Github, Twitter } from 'lucide-react';

interface UserDetails {
  userid: string;
  email: string;
  name: string;
  role: string;
}

const DevAskProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userdetails, setUserdetails] = useState<UserDetails>({})
  const [isLoading, setIsLoading] = useState(true);
  const fetchdata = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/userprofile");
        const data: UserDetails = await response.json();
        setUserdetails(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Keep using default data if fetch fails
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchdata();
  }, []);

  const stats = [
    { label: 'Reputation', value: '1,245' },
    { label: 'Reached', value: '5.4k' },
    { label: 'Answers', value: '45' },
    { label: 'Questions', value: '12' }
  ];

  const topTags = [
    { name: 'javascript', score: 450, posts: 23 },
    { name: 'react', score: 320, posts: 15 },
    { name: 'css', score: 120, posts: 8 },
    { name: 'node.js', score: 85, posts: 5 }
  ];

  const badges = [
    { type: 'Gold', count: 2, color: 'bg-yellow-100 text-yellow-800' },
    { type: 'Silver', count: 5, color: 'bg-gray-200 text-gray-700' },
    { type: 'Bronze', count: 12, color: 'bg-amber-100 text-amber-700' }
  ];

  const topPosts = [
    { votes: 45, title: 'How to center a div horizontally and vertically?', color: 'bg-green-100 text-green-700' },
    { votes: 32, title: 'Understanding memo vs useMemo', color: 'bg-blue-100 text-blue-700' },
    { votes: 28, title: 'Difference between null and undefined in JavaScript', color: 'bg-green-100 text-green-700' },
    { votes: 15, title: 'CSS Grid layout best practices', color: 'bg-green-100 text-green-700' }
  ];

  const activityItems = [
    { type: 'answer', title: 'How to optimize React component re-renders?', votes: 12, time: '2 hours ago', tags: ['react', 'performance'] },
    { type: 'question', title: 'Best practices for error handling in Express.js?', votes: 8, time: '5 hours ago', tags: ['node.js', 'express'] },
    { type: 'answer', title: 'Understanding async/await in JavaScript', votes: 24, time: '1 day ago', tags: ['javascript', 'async'] },
    { type: 'comment', title: 'Commented on "CSS Flexbox vs Grid"', time: '2 days ago' },
    { type: 'answer', title: 'How to implement authentication in Next.js?', votes: 18, time: '3 days ago', tags: ['next.js', 'auth'] },
    { type: 'question', title: 'TypeScript generic constraints best practices?', votes: 15, time: '4 days ago', tags: ['typescript', 'generics'] },
    { type: 'badge', title: 'Earned "Great Answer" badge', time: '5 days ago' },
    { type: 'answer', title: 'Debugging memory leaks in Node.js applications', votes: 31, time: '1 week ago', tags: ['node.js', 'debugging'] }
  ];

  const questions = [
    { 
      votes: 15, 
      answers: 7, 
      views: 324, 
      title: 'Best practices for error handling in Express.js?', 
      tags: ['node.js', 'express', 'error-handling'],
      time: '5 hours ago',
      accepted: true
    },
    { 
      votes: 8, 
      answers: 3, 
      views: 156, 
      title: 'TypeScript generic constraints best practices?', 
      tags: ['typescript', 'generics'],
      time: '4 days ago',
      accepted: false
    },
    { 
      votes: 22, 
      answers: 12, 
      views: 891, 
      title: 'How to implement real-time notifications in React?', 
      tags: ['react', 'websocket', 'notifications'],
      time: '1 week ago',
      accepted: true
    },
    { 
      votes: 12, 
      answers: 5, 
      views: 267, 
      title: 'Database design for multi-tenant SaaS application?', 
      tags: ['database', 'postgresql', 'architecture'],
      time: '2 weeks ago',
      accepted: true
    },
    { 
      votes: 6, 
      answers: 2, 
      views: 94, 
      title: 'Optimizing bundle size in Webpack?', 
      tags: ['webpack', 'optimization'],
      time: '3 weeks ago',
      accepted: false
    }
  ];

  const answers = [
    { 
      votes: 45, 
      accepted: true,
      title: 'How to center a div horizontally and vertically?', 
      tags: ['css', 'flexbox'],
      time: '3 days ago',
      excerpt: 'The modern approach is to use Flexbox. Simply apply display: flex, justify-content: center, and align-items: center to the parent container...'
    },
    { 
      votes: 32, 
      accepted: true,
      title: 'Understanding memo vs useMemo in React', 
      tags: ['react', 'performance', 'hooks'],
      time: '1 week ago',
      excerpt: 'React.memo is a higher-order component that memoizes the entire component, while useMemo is a hook that memoizes a specific value...'
    },
    { 
      votes: 28, 
      accepted: false,
      title: 'Difference between null and undefined in JavaScript', 
      tags: ['javascript', 'fundamentals'],
      time: '2 weeks ago',
      excerpt: 'undefined means a variable has been declared but not assigned a value, while null is an assignment value that represents no value...'
    },
    { 
      votes: 24, 
      accepted: true,
      title: 'Understanding async/await in JavaScript', 
      tags: ['javascript', 'async', 'promises'],
      time: '1 day ago',
      excerpt: 'async/await is syntactic sugar over Promises that makes asynchronous code look and behave more like synchronous code...'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

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
                <a href="#" className="text-gray-700 hover:text-gray-900">Questions</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Tags</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Users</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search questions..."
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                {userdetails.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{userdetails.name}</h1>
                <p className="text-gray-600 mb-4">{userdetails.role}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Joined March 2021</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link size={16} />
                    <span>johndoe.dev</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Github size={16} />
                    <span>@johndoe</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Twitter size={16} />
                    <span>@johndoe_dev</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                Edit Profile
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'profile', label: 'Profile' },
                { id: 'activity', label: 'Activity' },
                { id: 'questions', label: 'Questions', count: 12 },
                { id: 'answers', label: 'Answers', count: 45 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {tab.count && <span className="ml-2 text-sm text-gray-500">{tab.count}</span>}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Profile Tab Content */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Stats</h2>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top Tags</h2>
              <div className="space-y-4">
                {topTags.map((tag, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                        {tag.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-semibold">{tag.score}</span>
                      <span>score</span>
                      <span className="font-semibold">{tag.posts}</span>
                      <span>posts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Badges</h2>
              <div className="flex flex-wrap gap-3">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 ${badge.color} rounded-full text-sm font-medium`}
                  >
                    {badge.type} ({badge.count})
                  </span>
                ))}
              </div>
            </div>

            {/* Top Posts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top Posts</h2>
              <div className="space-y-4">
                {topPosts.map((post, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`${post.color} px-3 py-1 rounded font-semibold text-sm flex-shrink-0`}>
                      {post.votes}
                    </div>
                    <a href="#" className="text-blue-600 hover:underline">
                      {post.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {activityItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {item.type === 'answer' && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                            Answer
                          </span>
                        )}
                        {item.type === 'question' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            Question
                          </span>
                        )}
                        {item.type === 'comment' && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            Comment
                          </span>
                        )}
                        {item.type === 'badge' && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                            Badge
                          </span>
                        )}
                        {item.votes !== undefined && (
                          <span className="text-sm font-semibold text-gray-700">
                            {item.votes} votes
                          </span>
                        )}
                      </div>
                      <a href="#" className="text-blue-600 hover:underline font-medium">
                        {item.title}
                      </a>
                      {item.tags && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 ml-4 flex-shrink-0">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Questions</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Ask Question
              </button>
            </div>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 flex-shrink-0">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-gray-900">{question.votes}</span>
                        <span>votes</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className={`font-semibold ${question.accepted ? 'text-green-600' : 'text-gray-900'}`}>
                          {question.answers}
                        </span>
                        <span>answers</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-gray-900">{question.views}</span>
                        <span>views</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <a href="#" className="text-lg text-blue-600 hover:underline font-medium">
                          {question.title}
                        </a>
                        {question.accepted && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded ml-2 flex-shrink-0">
                            Accepted
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {question.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 cursor-pointer">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-4">{question.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Answers Tab */}
        {activeTab === 'answers' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Answers</h2>
            <div className="space-y-4">
              {answers.map((answer, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`px-3 py-2 rounded-lg ${answer.accepted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        <span className="font-bold text-lg">{answer.votes}</span>
                      </div>
                      {answer.accepted && (
                        <span className="text-xs text-green-600 mt-1">✓ Accepted</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <a href="#" className="text-lg text-blue-600 hover:underline font-medium block mb-2">
                        {answer.title}
                      </a>
                      <p className="text-gray-600 text-sm mb-3">{answer.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {answer.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 cursor-pointer">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-4">{answer.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 bg-white rounded-lg shadow-sm p-8">
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
                <Link className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
            <span>© 2025 DevAsk Inc. All rights reserved.</span>
            <span>Made with ❤️ for developers</span>
          </div>
        </footer>
      </div>
    </div>
  );
}; 

export default DevAskProfile;