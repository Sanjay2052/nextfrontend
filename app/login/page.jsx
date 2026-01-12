"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/register",
        { name, email, password }
      );

      console.log(response.data);
      alert("Registration successful!");
      router.push("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="main-body">
      <div className="circle c1"></div>
      <div className="circle c2"></div>
      <div className="circle c3"></div>
      <div className="circle c4"></div>

      <div className="login-container">
        <div className="left-side">
          <h1 className="brand-logo">falcon</h1>

          <p className="description">
            Start your journey with Falcon. Create an account to access our full
            suite of digital product tools and UI designs.
          </p>

          <div className="signup-text">
            Already have an account?
            <br />
            <Link href="/login">Log in here!</Link>
          </div>

          <div className="legal-links">
            By signing up, you agree to our <a href="#">terms</a> and{" "}
            <a href="#">privacy</a>
          </div>
        </div>
        <div className="right-side">
          <h2>Create Account</h2>

          <form>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="btn-login"
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </form>

          <div className="divider">or sign up with</div>

          <div className="social-area">
            <button type="button" className="social-btn google">
              Google
            </button>
            <button type="button" className="social-btn facebook">
              Facebook
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
          font-family: "Segoe UI", Roboto, Arial, sans-serif;
        }

        .circle {
          position: absolute;
          border: 2px solid #adc9ff;
          border-radius: 50%;
          z-index: 0;
        }
        .c1 {
          width: 150px;
          height: 150px;
          top: -50px;
          right: 10%;
        }
        .c2 {
          width: 80px;
          height: 80px;
          top: 150px;
          right: 5%;
        }
        .c3 {
          width: 100px;
          height: 100px;
          bottom: 50px;
          left: 5%;
        }
        .c4 {
          width: 40px;
          height: 40px;
          bottom: 150px;
          left: 8%;
        }

        .login-container {
          display: flex;
          width: 900px;
          max-width: 95%;
          min-height: 550px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
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
        }

        .description {
          font-size: 0.95rem;
          line-height: 1.6;
          opacity: 0.9;
        }

        .signup-text :global(a) {
          color: #fff;
          font-weight: bold;
          text-decoration: underline;
        }

        .right-side {
          flex: 1.2;
          padding: 40px 50px;
        }

        .input-group {
          margin-bottom: 15px;
        }

        .input-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
        }

        .btn-login {
          width: 100%;
          padding: 14px;
          background: #3b71ca;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
        }

        .btn-login:hover {
          background: #2a5bb0;
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
