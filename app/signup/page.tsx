'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Add your registration logic here
    console.log('Signup attempt:', formData);
    
    // For now, just redirect to login
    router.push('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">
          {/* Add your logo here */}
          <h1>Logo</h1>
        </div>

        <h2>Create a New Account</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              required
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-signup">
            Sign Up
          </button>
        </form>

        <div className="login-link">
          <h3>
            Already have an account? <Link href="/login">Login</Link>
          </h3>
        </div>
      </div>

      <style jsx>{`
        .signup-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .signup-box {
          background: white;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 400px;
        }

        .logo {
          text-align: center;
          margin-bottom: 30px;
        }

        .logo h1 {
          color: #667eea;
          font-size: 32px;
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 24px;
        }

        .signup-form {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        input[type='text'],
        input[type='email'],
        input[type='password'] {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 5px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        input[type='text']:focus,
        input[type='email']:focus,
        input[type='password']:focus {
          outline: none;
          border-color: #667eea;
        }

        .btn-signup {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .btn-signup:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .login-link {
          text-align: center;
          margin-top: 20px;
        }

        .login-link h3 {
          font-size: 14px;
          font-weight: normal;
        }

        .login-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .login-link a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}