// src/pages/StandardSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap } from 'lucide-react';

const StandardSelection = () => {
  const navigate = useNavigate();
  const { selectStandard, studentData } = useAuth();
  const [selectedStandard, setSelectedStandard] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const standards = [
    { value: '1', label: 'Class 1' },
    { value: '2', label: 'Class 2' },
    { value: '3', label: 'Class 3' },
    { value: '4', label: 'Class 4' },
    { value: '5', label: 'Class 5' },
    { value: '6', label: 'Class 6' },
    { value: '7', label: 'Class 7' },
    { value: '8', label: 'Class 8' },
    { value: '9', label: 'Class 9' },
    { value: '10', label: 'Class 10' },
    { value: '11', label: 'Class 11' },
    { value: '12', label: 'Class 12' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedStandard) {
      setError('Please select a standard');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await selectStandard(selectedStandard);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to select standard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if standard already selected
  React.useEffect(() => {
    if (studentData && studentData.standard_selected) {
      navigate('/dashboard');
    }
  }, [studentData, navigate]);

  return (
    <div className="standard-selection-page">
      <div className="standard-container">
        <div className="standard-header">
          <GraduationCap size={64} className="standard-icon" />
          <h1>Select Your Class</h1>
          <p>Choose your current class to get personalized content and lessons</p>
        </div>

        <form onSubmit={handleSubmit} className="standard-form">
          <div className="standards-grid">
            {standards.map((standard) => (
              <label
                key={standard.value}
                className={`standard-option ${
                  selectedStandard === standard.value ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="standard"
                  value={standard.value}
                  checked={selectedStandard === standard.value}
                  onChange={(e) => setSelectedStandard(e.target.value)}
                />
                <span className="standard-label">{standard.label}</span>
              </label>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="submit-button"
            disabled={loading || !selectedStandard}
          >
            {loading ? 'Saving...' : 'Continue to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StandardSelection;