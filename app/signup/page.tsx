// app/signup/page.tsx
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
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            email_verified: true
          }
        },
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;

        router.push('/dashboard');
        router.refresh();
      }
      
    } catch (error: any) {
      console.error('Signup error:', error);
      
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
      {/* Background Pattern */}
      <div className="background-pattern">
        <div className="pattern-circle"></div>
        <div className="pattern-circle"></div>
        <div className="pattern-circle"></div>
      </div>

      <div className="signup-box">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-icon">💳</div>
          <h1 className="logo-text">Cards City</h1>
          <span className="logo-badge">2026</span>
        </div>

        <h2 className="welcome-text">Create Account</h2>
        <p className="subtitle">Join the premium marketplace today</p>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                autoComplete="new-password"
              />
            </div>
            <div className="password-requirements">
              <span className={formData.password.length >= 6 ? 'valid' : ''}>
                {formData.password.length >= 6 ? '✓' : '○'} At least 6 characters
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon">✓</span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                autoComplete="new-password"
              />
            </div>
            {formData.confirmPassword && (
              <div className="password-match">
                {formData.password === formData.confirmPassword ? (
                  <span className="match-valid">✓ Passwords match</span>
                ) : (
                  <span className="match-invalid">✗ Passwords do not match</span>
                )}
              </div>
            )}
          </div>

          <div className="terms-section">
            <label className="checkbox-label">
              <input type="checkbox" required /> 
              <span>
                I agree to the{' '}
                <Link href="/terms" className="terms-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button type="submit" className="btn-signup" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner">⏳</span>
                Creating Account...
              </>
            ) : (
              'Create Account & Login'
            )}
          </button>
        </form>

        <div className="login-section">
          <p className="login-text">
            Already have an account?{' '}
            <Link href="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>

        <div className="security-badge">
          <span>🔒</span>
          <span>Secured by Supabase</span>
          <span>•</span>
          <span>100% Encrypted</span>
        </div>
      </div>

      <style jsx>{`
        .signup-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        /* Background Pattern */
        .background-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          overflow: hidden;
        }

        .pattern-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-yellow), var(--accent-yellow-dark));
          opacity: 0.05;
          animation: float 20s infinite ease-in-out;
        }

        .pattern-circle:nth-child(1) {
          width: 500px;
          height: 500px;
          top: -250px;
          right: -100px;
          animation-delay: 0s;
        }

        .pattern-circle:nth-child(2) {
          width: 400px;
          height: 400px;
          bottom: -200px;
          left: -100px;
          animation-delay: -5s;
        }

        .pattern-circle:nth-child(3) {
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -10s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .signup-box {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 48px 40px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 500px;
          position: relative;
          z-index: 10;
          border: 1px solid rgba(251, 191, 36, 0.2);
          animation: slideUp 0.5s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .logo-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .logo-icon {
          font-size: 40px;
          background: linear-gradient(135deg, var(--accent-yellow), var(--accent-yellow-dark));
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(251, 191, 36, 0.3);
        }

        .logo-text {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.5px;
        }

        .logo-badge {
          background: linear-gradient(135deg, var(--accent-yellow), var(--accent-yellow-dark));
          color: #0f172a;
          padding: 4px 12px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 700;
          border: 2px solid white;
        }

        .welcome-text {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
          text-align: center;
        }

        .subtitle {
          color: #64748b;
          text-align: center;
          margin-bottom: 32px;
          font-size: 16px;
        }

        .error-message {
          background: #fee2e2;
          border: 1px solid #ef4444;
          color: #dc2626;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          animation: shake 0.5s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .error-icon {
          font-size: 18px;
        }

        .signup-form {
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #334155;
          font-size: 14px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: #94a3b8;
          font-size: 18px;
          z-index: 1;
        }

        input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s;
          background: white;
          color: #0f172a;
        }

        input:hover {
          border-color: #cbd5e1;
        }

        input:focus {
          outline: none;
          border-color: var(--accent-yellow);
          box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.15);
        }

        input:disabled {
          background: #f1f5f9;
          border-color: #e2e8f0;
          cursor: not-allowed;
          opacity: 0.7;
        }

        input::placeholder {
          color: #94a3b8;
        }

        .password-requirements {
          margin-top: 8px;
          font-size: 13px;
          color: #64748b;
        }

        .password-requirements span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .password-requirements .valid {
          color: #10b981;
        }

        .password-match {
          margin-top: 6px;
          font-size: 13px;
        }

        .match-valid {
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .match-invalid {
          color: #ef4444;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .terms-section {
          margin: 24px 0;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #475569;
          font-size: 14px;
          line-height: 1.5;
          cursor: pointer;
        }

        .checkbox-label input[type="checkbox"] {
          width: auto;
          margin-top: 2px;
          accent-color: var(--accent-yellow);
          transform: scale(1.1);
        }

        .terms-link {
          color: var(--accent-yellow-dark);
          text-decoration: none;
          font-weight: 600;
        }

        .terms-link:hover {
          text-decoration: underline;
        }

        .btn-signup {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }

        .btn-signup::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.2), transparent);
          transition: left 0.5s;
        }

        .btn-signup:hover::before {
          left: 100%;
        }

        .btn-signup:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(251, 191, 36, 0.3);
        }

        .btn-signup:active {
          transform: translateY(0);
        }

        .btn-signup:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          animation: spin 1s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .login-section {
          text-align: center;
          padding-top: 24px;
          border-top: 2px solid #f1f5f9;
        }

        .login-text {
          color: #64748b;
          font-size: 15px;
        }

        .login-link {
          color: var(--accent-yellow-dark);
          font-weight: 700;
          text-decoration: none;
          margin-left: 5px;
          transition: color 0.2s;
        }

        .login-link:hover {
          color: #0f172a;
          text-decoration: underline;
        }

        .security-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          padding: 12px;
          background: #f8fafc;
          border-radius: 30px;
          color: #475569;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid #e2e8f0;
        }

        @media (max-width: 600px) {
          .signup-box {
            padding: 32px 24px;
          }

          .logo-icon {
            width: 50px;
            height: 50px;
            font-size: 32px;
          }

          .logo-text {
            font-size: 26px;
          }

          .welcome-text {
            font-size: 24px;
          }

          .security-badge {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}