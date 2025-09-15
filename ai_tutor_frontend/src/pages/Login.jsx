// src/pages/Login.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, studentData, loading } = useAuth();
  const [isSignUp, setIsSignUp] = React.useState(false);

  useEffect(() => {
    if (loading) return; // Wait for auth state to load
    if (isAuthenticated && studentData) {
      if (!studentData.standard_selected) {
        navigate('/select-standard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, studentData, loading, navigate]);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>AI Tutor App</h1>
          <p>Welcome to your personalized learning journey</p>
        </div>
        
        <div className="auth-toggle">
          <button 
            className={`toggle-btn ${!isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button 
            className={`toggle-btn ${isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        <div className="clerk-auth-container">
          {isSignUp ? (
            <SignUp 
              redirectUrl="/select-standard"
              signInUrl="/login"
              appearance={{
                elements: {
                  formButtonPrimary: 'auth-button',
                  card: 'auth-card'
                }
              }}
            />
          ) : (
            <SignIn 
              redirectUrl="/dashboard"
              signUpUrl="/login"
              appearance={{
                elements: {
                  formButtonPrimary: 'auth-button',
                  card: 'auth-card'
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;