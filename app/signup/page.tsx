'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const supabase = createClient();

    try {
      // 1. Sign up the user - Trigger will auto-create profile
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            email_verified: true // Skip email verification
          }
        },
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        // 2. Auto login immediately
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;

        // 3. Redirect straight to dashboard
        router.push('/dashboard');
        router.refresh();
      }
      
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Handle specific error cases
      if (error.message?.includes('User already registered')) {
        setError('An account with this email already exists. Please login instead.');
      } else {
        setError(error.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
          <h1>Logo</h1>
        </div>

        <h2>Create Account</h2>

        {error && (
          <div style={{ 
            color: '#ff3333', 
            marginBottom: '20px', 
            textAlign: 'center',
            padding: '12px',
            background: '#ffe6e6',
            borderRadius: '5px',
            fontSize: '14px',
            border: '1px solid #ff9999'
          }}>
            {error}
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password (min. 6 characters)"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
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
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-signup" 
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <span>
                <span style={{ marginRight: '8px' }}>⏳</span>
                Creating Account...
              </span>
            ) : (
              'Sign Up & Login'
            )}
          </button>
        </form>

        <div className="login-link">
          <p>
            Already have an account?{' '}
            <Link href="/login" style={{ 
              color: '#667eea', 
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              Login
            </Link>
          </p>
        </div>

        <div style={{ 
          marginTop: '20px', 
          paddingTop: '20px', 
          borderTop: '1px solid #e0e0e0',
          textAlign: 'center',
          fontSize: '12px',
          color: '#666'
        }}>
          By signing up, you agree to our Terms of Service and Privacy Policy
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
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .logo {
          text-align: center;
          margin-bottom: 30px;
        }

        .logo h1 {
          color: #667eea;
          font-size: 32px;
          font-weight: 700;
          margin: 0;
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 24px;
          font-weight: 600;
        }

        .signup-form {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        input[type='email'],
        input[type='password'] {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.3s;
          background: #fafafa;
        }

        input[type='email']:hover,
        input[type='password']:hover {
          border-color: #b3b3b3;
          background: white;
        }

        input[type='email']:focus,
        input[type='password']:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        input[type='email']:disabled,
        input[type='password']:disabled {
          background: #f0f0f0;
          border-color: #ddd;
          cursor: not-allowed;
        }

        .btn-signup {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 10px;
          box-shadow: 0 4px 6px rgba(102, 126, 234, 0.2);
        }

        .btn-signup:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(102, 126, 234, 0.3);
          background: linear-gradient(135deg, #5a6fe0 0%, #68428f 100%);
        }

        .btn-signup:active {
          transform: translateY(0);
        }

        .btn-signup:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .login-link {
          text-align: center;
          margin-top: 25px;
        }

        .login-link p {
          color: #666;
          font-size: 15px;
        }

        .login-link a {
          color: #667eea;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .login-link a:hover {
          color: #5a6fe0;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .signup-box {
            padding: 30px 20px;
          }

          h2 {
            font-size: 22px;
          }

          input[type='email'],
          input[type='password'] {
            padding: 12px 14px;
          }
        }
      `}</style>
    </div>
  );
}