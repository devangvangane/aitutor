// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserButton } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';
import Chatbot from '../components/Chatbot';
import ChapterList from '../components/ChapterList';
import axios from 'axios';

const Dashboard = () => {
  const { studentData } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chatSession, setChatSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/api/subjects/');
        setSubjects(response.data.subjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      if (selectedSubject && studentData?.student_id) {
        try {
          const response = await axios.get(
            `/api/subjects/${selectedSubject}/chapters/${studentData.student_id}/`
          );
          setChapters(response.data.chapters);
        } catch (error) {
          console.error('Error fetching chapters:', error);
          setChapters([]);
        }
      }
    };

    fetchChapters();
  }, [selectedSubject, studentData]);

  const handleSubjectChange = (subjectName) => {
    setSelectedSubject(subjectName);
    setSelectedChapter(null);
    setChatSession(null);
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
  };

  const startChatSession = async () => {
    try {
      const response = await axios.post('/api/chatbot/start-session/', {
        student_id: studentData.student_id,
        subject_name: selectedSubject,
        chapter_id: selectedChapter?.id
      });
      
      setChatSession({
        session_id: response.data.session_id,
        subject: selectedSubject,
        chapter: selectedChapter
      });
    } catch (error) {
      console.error('Error starting chat session:', error);
    }
  };

  useEffect(() => {
    if (selectedSubject && studentData) {
      startChatSession();
    }
  }, [selectedSubject, selectedChapter]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar 
        subjects={subjects}
        selectedSubject={selectedSubject}
        onSubjectChange={handleSubjectChange}
        userButton={<UserButton />}
      />
      
      <div className="dashboard-content">
        <div className="chat-section">
          <Chatbot 
            chatSession={chatSession}
            selectedSubject={selectedSubject}
            selectedChapter={selectedChapter}
            studentId={studentData?.student_id}
          />
        </div>
        
        <div className="chapters-section">
          <ChapterList 
            chapters={chapters}
            selectedChapter={selectedChapter}
            onChapterSelect={handleChapterSelect}
            subjectName={selectedSubject}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;