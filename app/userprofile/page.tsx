"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';


interface usertype {
    userId?: number;
    name?: string;
    email?: string;
    domain: string;
    role?: "ADMIN" | "USER";
    bio?: string;
    reputation?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface QuestionType {
    _id: string; 
    title: string;
    description: string;
    tags?: string[];
    code?: string;
    userId: string;
    views?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface AnswerType {
    _id: string;
    content: string;
    votes?: number;
    createdAt?: Date;
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'questions' | 'answers'>('profile');
    const [user, setUser] = useState<usertype>({ domain: "" });
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [answer, setanswer] = useState<AnswerType[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await axios.get("http://localhost:3000/api/userprofile");
                const { user, questions, answer } = res.data;

                setUser(user || {});
                setQuestions(questions || []);
                setanswer(answer || []);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        loadData();
    }, []);

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

            <style jsx global>{`
                :root { --glass-bg: #ffffff; --stat-bg: #f8f9fa; }
                body { background-color: #f4f7f6; font-family: 'Inter', sans-serif; color: #2d3436; }
                .profile-header-img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 5px solid #fff; }
                .nav-tabs { border-bottom: 1px solid #dee2e6; }
                .nav-tabs .nav-link { border: none; color: #636e72; padding: 1rem 1.5rem; font-weight: 500; background: none; cursor: pointer; }
                .nav-tabs .nav-link.active { color: #0d6efd; border-bottom: 3px solid #0d6efd; }
                .custom-card { border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); background: white; }
                .stat-box { background-color: var(--stat-bg); border-radius: 10px; padding: 1.5rem; height: 100%; }
                .stat-value { font-size: 1.5rem; font-weight: 700; display: block; }
                .stat-label { font-size: 0.85rem; color: #636e72; }
                .tag-badge { background-color: #e9ecef; color: #495057; padding: 0.4rem 0.8rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; transition: 0.2s; display: inline-block; }
                .post-score { min-width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-weight: bold; }
                .tab-content > .tab-pane { display: none; }
                .tab-content > .active { display: block; }
                .fade { transition: opacity 0.15s linear; }
                .fade:not(.show) { opacity: 0; }
                .fade.show { opacity: 1; }
            `}</style>

            {/* NAVBAR PRESERVED */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
                <div className="container">
                    <a className="navbar-brand fw-bold text-primary d-flex align-items-center" href="#">
                        <i className="fa-solid fa-code me-2"></i> DevAsk
                    </a>
                    <div className="collapse navbar-collapse justify-content-center">
                        <ul className="navbar-nav gap-3">
                            <li className="nav-item"><a className="nav-link" href="#">Questions</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Tags</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Users</a></li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '38px', height: '38px' }}>
                            {user.name ? user.name.charAt(0) : 'U'}
                        </div>
                    </div>
                </div>
            </nav>

            {/* HEADER PRESERVED */}
            <header className="bg-white pt-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <img 
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                                alt="Profile" 
                                className="profile-header-img shadow-sm" 
                            />
                        </div>
                        <div className="col">
                            <h2 className="fw-bold mb-1">{user.name}</h2>
                            <p className="text-muted mb-3 fs-5">{user.domain}</p>
                            <div className="d-flex flex-wrap gap-4 text-muted small">
                                <span><i className="fa-solid fa-location-dot me-1"></i> San Francisco, CA</span>
                                <span><i className="fa-solid fa-calendar-days me-1"></i> Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'March 2021'}</span>
                                <span><i className="fa-brands fa-github me-1"></i> @{user.name?.toLowerCase().replace(/\s/g, '') || 'user'}</span>
                            </div>
                        </div>
                        <div className="col-md-auto mt-3 mt-md-0">
                            <button className="btn btn-outline-secondary btn-sm px-3 me-2">Edit Profile</button>
                            <button className="btn btn-primary btn-sm px-4">Follow</button>
                        </div>
                    </div>

                    <div className="nav nav-tabs mt-5" role="tablist">
                        <button className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile</button>
                        <button className={`nav-link ${activeTab === 'questions' ? 'active' : ''}`} onClick={() => setActiveTab('questions')}>
                            Questions <span className="badge bg-light text-muted border ms-1">{questions.length}</span>
                        </button>
                        <button className={`nav-link ${activeTab === 'answers' ? 'active' : ''}`} onClick={() => setActiveTab('answers')}>
                            Answers <span className="badge bg-light text-muted border ms-1">{answer?.length || 0}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="container my-5">
                <div className="tab-content">
                    {/* PROFILE TAB */}
                    {activeTab === 'profile' && (
                        <div className="tab-pane fade show active">
                            <div className="row g-4">
                                <div className="col-lg-4">
                                    <div className="card custom-card p-4 mb-4">
                                        <h5 className="fw-bold mb-4">Stats</h5>
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <div className="stat-box">
                                                    <span className="stat-value">{user.reputation || 0}</span>
                                                    <span className="stat-label">Reputation</span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="stat-box">
                                                    <span className="stat-value">5.4k</span>
                                                    <span className="stat-label">Reached</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-8">
                                    <div className="card custom-card p-4 mb-4">
                                        <h5 className="fw-bold mb-4">Top Tags</h5>
                                        <div className="d-flex flex-column gap-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="tag-badge">javascript</span>
                                                <div className="text-muted small"><span className="fw-bold text-dark">450</span> score</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* QUESTIONS TAB */}
                    {activeTab === 'questions' && (
                        <div className="tab-pane fade show active">
                            <div className="card custom-card p-4">
                                <h5 className="fw-bold mb-4">Questions Asked</h5>
                                <div className="d-flex flex-column gap-4">
                                    {questions.length > 0 ? questions.map((q) => (
                                        <div key={q._id} className="d-flex align-items-start gap-3 border-bottom pb-3">
                                            <div className="post-score bg-primary-subtle text-primary">{q.views || 0}</div>
                                            <div>
                                                <a href="#" className="text-decoration-none fw-bold d-block mb-1">{q.title}</a>
                                                <div className="d-flex gap-2">
                                                    {q.tags?.map(tag => (
                                                        <span key={tag} className="tag-badge py-1 px-2" style={{ fontSize: '0.75rem' }}>{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )) : <p className="text-muted">No questions found.</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ANSWERS TAB (Completed using same design) */}
                    {activeTab === 'answers' && (
                        <div className="tab-pane fade show active">
                            <div className="card custom-card p-4">
                                <h5 className="fw-bold mb-4">Your Answers</h5>
                                <div className="d-flex flex-column gap-4">
                                    {answer && answer.length > 0 ? answer.map((a) => (
                                        <div key={a._id} className="d-flex align-items-start gap-3 border-bottom pb-3">
                                            <div className="post-score bg-success-subtle text-success">{a.votes || 0}</div>
                                            <div className="w-100">
                                                <p className="mb-2 text-dark">{a.content}</p>
                                                <div className="text-muted small">
                                                    Answered on {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    )) : <p className="text-muted">No answers found.</p>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}