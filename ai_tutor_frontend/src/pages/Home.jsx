// src/pages/Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Brain, Users, Award } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, studentData } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      if (studentData && !studentData.standard_selected) {
        navigate('/select-standard');
      } else if (studentData && studentData.standard_selected) {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, studentData, navigate]);

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              AI Tutor App
              <span className="title-accent">Smart Learning Companion</span>
            </h1>
            <p className="hero-description">
              Personalized AI-powered tutoring for students. Get instant help with your studies,
              interactive lessons, and adaptive learning experiences tailored to your grade level.
            </p>
            <button className="cta-button" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose AI Tutor?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Brain className="feature-icon" />
              <h3>AI-Powered Learning</h3>
              <p>Advanced AI technology that adapts to your learning style and pace</p>
            </div>
            <div className="feature-card">
              <BookOpen className="feature-icon" />
              <h3>Comprehensive Subjects</h3>
              <p>Mathematics, Science, English, and Social Studies for all grade levels</p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3>Interactive Chat</h3>
              <p>Ask questions and get instant, personalized explanations</p>
            </div>
            <div className="feature-card">
              <Award className="feature-icon" />
              <h3>Progress Tracking</h3>
              <p>Monitor your learning journey and celebrate achievements</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="container">
          <p>&copy; 2024 AI Tutor App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;