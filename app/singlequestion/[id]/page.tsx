"use client"
import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Bold, Code } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'next/navigation';

// Interfaces for Type Safety
interface Question {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  code?: string;
  views: number;
  userId: string;
  createdAt: string;
}

interface Answer {
  _id: string;
  content: string;
  votes: number;
  userId: string;
  createdAt: string;
}

const QuestionDetail: React.FC = () => {
  const { id } = useParams(); // This is our questionId
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]); 
  const [loading, setLoading] = useState(true);
  const [answerText, setAnswerText] = useState<string>('');

  // 1. Fetch Data from Microservices
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Question Service
        const qRes = await axios.get(`http://localhost:8003/api/question/${id}`);
        setQuestion(qRes.data);

        // Answer Service - Fetching all answers linked to this question ID
        const aRes = await axios.get(`http://localhost:8004/api/answer/${id}`);
        setAnswers(Array.isArray(aRes.data) ? aRes.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // 2. Post New Answer (Updated to match your Express Router.post('/:id'))
  const handlePostAnswer = async () => {
    if (!answerText.trim()) return;

    try {
      // Per your route: Router.post('/:id', ...) we put id in the URL
      // And send { content } in the body
      const response = await axios.post(`http://localhost:8004/api/answer/${id}`, {
        content: answerText,
      });

      // Assuming your backend returns the new answer object (senddata)
      // If it only returns a string, you'll need to fetch answers again or 
      // construct a local object.
      if (typeof response.data === 'object') {
        setAnswers((prev) => [...prev, response.data]);
      } else {
        // Fallback: if backend just says "added", manually refresh list
        const refreshedAnswers = await axios.get(`http://localhost:8004/api/answer/${id}`);
        setAnswers(refreshedAnswers.data);
      }

      setAnswerText(""); 
      alert("Answer posted!");
    } catch (error) {
      console.error("Error posting answer:", error);
      alert("Failed to post answer");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">Loading Discussion...</div>;
  if (!question) return <div className="min-h-screen flex items-center justify-center">Question not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 tracking-tighter italic">DevAsk</span>
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Question Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{question.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 uppercase tracking-widest font-semibold">
            <span>By {question.userId.slice(-5)}</span>
            <span>•</span>
            <span>{new Date(question.createdAt).toLocaleDateString()}</span>
          </div>
          
          <div className="prose max-w-none text-gray-700 text-lg mb-8">
            <p className="whitespace-pre-line">{question.description}</p>
          </div>
          
          {question.code && (
            <div className="mb-8">
              <div className="bg-zinc-800 text-zinc-400 px-4 py-2 rounded-t-lg text-xs font-mono">Source Code</div>
              <pre className="bg-black text-green-400 p-6 rounded-b-lg overflow-x-auto font-mono text-sm shadow-2xl">
                <code>{question.code}</code>
              </pre>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-50">
            {question.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-md">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Answers List */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900">{answers.length} Community Answers</h2>
          {answers.length === 0 ? (
            <div className="bg-gray-100 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center text-gray-400">
              No answers yet. Be the first!
            </div>
          ) : (
            answers.map((a) => (
              <div key={a._id} className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm transition-hover hover:shadow-md">
                <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line mb-6">{a.content}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <ThumbsUp size={18} /> <span className="text-sm font-bold">{a.votes}</span>
                    </button>
                  </div>
                  <span className="text-xs font-mono text-gray-400">ID: {a.userId.slice(-5)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-xl shadow-xl border border-blue-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
             Your Contribution
          </h3>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Provide a detailed solution..."
            className="w-full h-56 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none resize-none transition-all text-gray-800"
          />
          <div className="mt-4 flex justify-end">
            <button 
              onClick={handlePostAnswer}
              disabled={!answerText.trim()}
              className="px-10 py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-95"
            >
              SUBMIT ANSWER
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionDetail;