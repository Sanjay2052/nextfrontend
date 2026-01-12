"use client"
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Register = () => {
    let [name, setname] = useState("")
    let [email, setemail] = useState("")
    let [password, setpassword] = useState("")
    let router = useRouter()

    async function adddata() {
        try {
            // Adjust the port/URL to match your Auth microservice (usually 8001 or 3000)
            let response = await axios.post("http://localhost:8001/api/register", { name, email, password })
            console.log(response.data)
            alert("Registration successful!")
            router.push("/login")
        } catch (error) {
            console.error("Registration Error:", error)
            alert("Failed to create account. Please try again.")
        }
    }

    return (
        <div className="main-body">
            {/* Background Decorative Circles */}
            <div className="circle c1"></div>
            <div className="circle c2"></div>
            <div className="circle c3"></div>
            <div className="circle c4"></div>

            <div className="login-container">
                {/* Left Blue Section */}
                <div className="left-side">
                    <h1 className="brand-logo">falcon</h1>
                    <p className="description">
                        Start your journey with Falcon. Create an account to access our full suite of digital product tools and UI designs.
                    </p>
                    <div className="signup-text">
                        Already have an account?<br />
                        <Link href="/login">Log in here!</Link>
                    </div>
                    <div className="legal-links">
                        By signing up, you agree to our <a href="#">terms</a> and <a href="#">privacy</a>
                    </div>
                </div>

                {/* Right Form Section */}
                <div className="right-side">
                    <h2>Create Account</h2>
                    <form>
                        <div className="input-group">
                            <label htmlFor="name">Full Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name"
                                onChange={((e) => { setname(e.target.value) })} 
                                placeholder="Enter your full name" 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email address</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                onChange={((e) => { setemail(e.target.value) })} 
                                placeholder="Enter your email" 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password"
                                onChange={((e) => { setpassword(e.target.value) })} 
                                placeholder="Create a password" 
                                required 
                            />
                        </div>

                        <button type="button" className="btn-login" onClick={adddata}>
                            Sign Up
                        </button>
                    </form>

                    <div className="divider">or sign up with</div>

                    <div className="social-area">
                        <button className="social-btn google" type="button">
                            google
                        </button>
                        <button className="social-btn facebook" type="button">
                            facebook
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .main-body {
                    background-color: #f4f7f9;
                    height: 100vh;
                    width: 100vw;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    position: relative;
                    font-family: 'Segoe UI', Roboto, Arial, sans-serif;
                }

                .circle {
                    position: absolute;
                    border: 2px solid #adc9ff;
                    border-radius: 50%;
                    z-index: 0;
                }
                .c1 { width: 150px; height: 150px; top: -50px; right: 10%; }
                .c2 { width: 80px; height: 80px; top: 150px; right: 5%; }
                .c3 { width: 100px; height: 100px; bottom: 50px; left: 5%; }
                .c4 { width: 40px; height: 40px; bottom: 150px; left: 8%; }

                .login-container {
                    display: flex;
                    width: 900px;
                    max-width: 95%;
                    min-height: 550px;
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                    overflow: hidden;
                    z-index: 1;
                }

                .left-side {
                    background: linear-gradient(135deg, #448aff, #2962ff);
                    color: white;
                    flex: 1;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    text-align: center;
                }

                .brand-logo {
                    font-size: 2.5rem;
                    font-weight: 800;
                    margin-top: 20px;
                }

                .description {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin: 20px 0;
                    opacity: 0.9;
                }

                .signup-text { margin-top: auto; margin-bottom: 20px; }
                .signup-text :global(a) { color: #fff; font-weight: bold; text-decoration: underline; }
                
                .legal-links { font-size: 0.75rem; opacity: 0.8; }
                .legal-links a { color: #fff; text-decoration: none; border-bottom: 1px solid #fff; }

                .right-side {
                    flex: 1.2;
                    padding: 40px 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .right-side h2 {
                    color: #333;
                    font-size: 1.8rem;
                    margin-bottom: 25px;
                }

                .input-group { margin-bottom: 15px; }
                .input-group label {
                    display: block;
                    font-size: 0.85rem;
                    color: #777;
                    margin-bottom: 6px;
                }

                .input-group input {
                    width: 100%;
                    padding: 10px 12px;
                    border: 1px solid #e0e0e0;
                    border-radius: 6px;
                    outline: none;
                    transition: border 0.3s;
                }

                .input-group input:focus { border-color: #448aff; }

                .btn-login {
                    width: 100%;
                    padding: 14px;
                    background: #3b71ca;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 10px;
                    transition: background 0.3s;
                }

                .btn-login:hover { background: #2a5bb0; }

                .divider {
                    text-align: center;
                    margin: 20px 0;
                    color: #aaa;
                    font-size: 0.8rem;
                    position: relative;
                }
                .divider::before, .divider::after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    width: 25%;
                    height: 1px;
                    background: #eee;
                }
                .divider::before { left: 0; }
                .divider::after { right: 0; }

                .social-area { display: flex; gap: 15px; }
                .social-btn {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    background: #fff;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.9rem;
                }
                .google { color: #db4437; border-color: #db4437; }
                .facebook { color: #4267B2; border-color: #4267B2; }

                @media (max-width: 768px) {
                    .login-container { flex-direction: column; width: 95%; height: auto; }
                    .left-side, .right-side { padding: 30px; }
                    .main-body { height: auto; min-height: 100vh; overflow-y: auto; }
                }
            `}</style>
        </div>
    )
}

export default Register