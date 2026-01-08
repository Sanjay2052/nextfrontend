"use client"
import React, { useState } from 'react';
import { Search, Code, X } from 'lucide-react';
import axios from 'axios';

const AskQuestionPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [code, setCode] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setDetails(text);
    setCharCount(text.length);
  };


  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      
      if (newTag && !tagsList.includes(newTag) && tagsList.length < 5) {
        setTagsList([...tagsList, newTag]);
        setTagInput('');
      }
    } else if (e.key === 'Backspace' && !tagInput && tagsList.length > 0) {
      setTagsList(tagsList.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTagsList(tagsList.filter((_, index) => index !== indexToRemove));
  };

  const addQuestion = async () => {
    if (title.trim().length < 10) {
        alert("Title must be at least 10 characters.");
        return;
    }
    if (details.trim().length < 20) {
        alert("Details must be at least 20 characters.");
        return;
    }
    if (tagsList.length === 0) {
        alert("Please add at least one tag.");
        return;
    }

    try {
      setIsSubmitting(true);
      const questionData = {
        title: title.trim(),
        details: details.trim(),
        tags: tagsList,
        code: code.trim(), 
      };

      await axios.post("http://localhost:8003/api/question", questionData);
      alert('Question posted successfully!');
      setTitle('');
      setDetails('');
      setTagsList([]);
      setTagInput('');
      setCode('');
      setCharCount(0);
      
    } catch (error: any) {
      console.error('Error posting question:', error);
      alert(error.response?.data?.message || 'Failed to post question.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscardDraft = () => {
    if (confirm('Are you sure you want to discard this draft?')) {
      setTitle('');
      setDetails('');
      setTagsList([]);
      setTagInput('');
      setCode('');
      setCharCount(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                <a href="#" className="text-gray-600 hover:text-gray-900">Questions</a>
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Sign up</button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Ask a public question</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Writing a good question</h2>
              <ul className="space-y-2 text-blue-900">
                <li>• Summarize your problem in a one-line title.</li>
                <li>• Describe your problem in more detail.</li>
                <li>• Describe what you tried and what you expected.</li>
                <li>• Add tags to help others find your question.</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <label className="block mb-2 text-lg font-bold text-gray-900">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Is there an R function for finding the index..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <label className="block mb-2 text-lg font-bold text-gray-900">What are the details?</label>
              <textarea
                value={details}
                onChange={handleDetailsChange}
                placeholder="Describe your problem in detail..."
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div className="mt-2 text-sm">
                {charCount < 20 ? <span className="text-orange-600">({charCount}/20)</span> : <span className="text-green-600">{charCount} characters</span>}
              </div>
            </div>

            {/* DESIGN-PRESERVING TAG INPUT */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <label className="block mb-2 text-lg font-bold text-gray-900">Tags</label>
              <div className="flex flex-wrap items-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                {tagsList.map((tag, index) => (
                  <span key={index} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
                    {tag}
                    <button onClick={() => removeTag(index)} className="hover:text-blue-900">
                        <X size={14} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={tagsList.length === 0 ? "e.g. javascript react" : ""}
                  className="flex-grow min-w-[120px] py-1 focus:outline-none text-gray-900"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">Press Space or Enter after each tag. Max 5 tags.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <label className="block mb-2 text-lg font-bold text-gray-900">Code (Optional)</label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Paste code here..."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={addQuestion}
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Posting...' : 'Post your question'}
              </button>
              <button onClick={handleDiscardDraft} className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium">
                Discard draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionPage;