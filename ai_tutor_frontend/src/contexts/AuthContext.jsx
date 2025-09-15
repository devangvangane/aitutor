// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          setLoading(true);
          const response = await axios.post('/api/accounts/auth/', {
            clerk_user_id: user.id,
            clerk_token: await user.getToken(),
            email: user.primaryEmailAddress?.emailAddress,
            username: user.username || user.firstName
          });

          setStudentData(response.data);
          setError(null);
        } catch (err) {
          console.error('Authentication error:', err);
          setError(err.response?.data?.error || 'Authentication failed');
        } finally {
          setLoading(false);
        }
      } else if (isLoaded && !isSignedIn) {
        setStudentData(null);
        setLoading(false);
      }
    };

    authenticateUser();
  }, [user, isLoaded, isSignedIn]);

  const selectStandard = async (standard) => {
    try {
      const response = await axios.post('/api/accounts/select-standard/', {
        student_id: studentData.student_id,
        standard: standard
      });

      setStudentData(prev => ({
        ...prev,
        standard: standard,
        standard_selected: true
      }));

      return response.data;
    } catch (err) {
      console.error('Standard selection error:', err);
      throw err;
    }
  };

  const value = {
    user,
    studentData,
    loading,
    error,
    isAuthenticated: isSignedIn && studentData,
    selectStandard
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};