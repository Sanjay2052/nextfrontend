"use client"
import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Bold, Code } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Question {
  _id: string; title: string; description: string; tags: string[];
  code?: string; views: number; userId: string; createdAt: string;
}

interface Answer {
  _id: string; content: string; votes: number; userId: string; createdAt: string;
}

const QuestionDetail: React.FC = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]); 
  const [loading, setLoading] = useState(true);
  const [answerText, setAnswerText] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/singlequestion/${id}`);
        setQuestion(res.data.question);
        setAnswers(Array.isArray(res.data.answers) ? res.data.answers : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handlePostAnswer = async () => {
    if (!answerText.trim()) return;
    try {
      const response = await axios.post(`/api/singlequestion/${id}`, {
        content: answerText,
      });

      // Optimistically update the UI by adding the new answer to the list
      if (typeof response.data === 'object') {
        setAnswers((prev) => [...prev, response.data]);
      }
      setAnswerText(""); 
      alert("Answer posted successfully!");
    } catch (error) {
      alert("Failed to post answer. Are you logged in?");
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
                      <ThumbsUp size={18} /> <span className="text-sm font-bold">{a.votes || 0}</span>
                    </button>
                  </div>
                  <span className="text-xs font-mono text-gray-400">ID: {a.userId.slice(-5)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-white rounded-xl shadow-xl border border-blue-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">Your Contribution</h3>
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