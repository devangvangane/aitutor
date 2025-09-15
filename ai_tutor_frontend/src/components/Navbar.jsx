// src/components/Navbar.js
import React from 'react';
import { Calculator, Atom, Book, Globe } from 'lucide-react';

const Navbar = ({ subjects, selectedSubject, onSubjectChange, userButton }) => {
  const getSubjectIcon = (subjectName) => {
    const icons = {
      mathematics: Calculator,
      science: Atom,
      english: Book,
      social_studies: Globe
    };
    
    const IconComponent = icons[subjectName] || Book;
    return <IconComponent size={20} />;
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <h1 className="app-name">AI Tutor App</h1>
          
          <div className="subjects-list">
            {subjects.map((subject) => (
              <button
                key={subject.name}
                className={`subject-btn ${
                  selectedSubject === subject.name ? 'active' : ''
                }`}
                onClick={() => onSubjectChange(subject.name)}
              >
                {getSubjectIcon(subject.name)}
                <span>{subject.display_name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="navbar-right">
          {userButton}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;