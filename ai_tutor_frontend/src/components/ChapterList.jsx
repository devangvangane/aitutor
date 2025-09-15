// src/components/ChapterList.js
import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

const ChapterList = ({ chapters, selectedChapter, onChapterSelect, subjectName }) => {
  const getSubjectDisplayName = (subjectName) => {
    const names = {
      mathematics: 'Mathematics',
      science: 'Science',
      english: 'English',
      social_studies: 'Social Studies'
    };
    return names[subjectName] || subjectName;
  };

  return (
    <div className="chapter-list-container">
      <div className="chapter-list-header">
        <BookOpen size={24} />
        <h3>{getSubjectDisplayName(subjectName)} Chapters</h3>
      </div>

      <div className="chapters-list">
        {chapters.length === 0 ? (
          <div className="no-chapters">
            <BookOpen size={48} />
            <p>No chapters available</p>
            <small>Chapters will appear here when available for your selected subject and class.</small>
          </div>
        ) : (
          chapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`chapter-item ${
                selectedChapter?.id === chapter.id ? 'selected' : ''
              }`}
              onClick={() => onChapterSelect(chapter)}
            >
              <div className="chapter-content">
                <div className="chapter-number">
                  Chapter {chapter.chapter_number}
                </div>
                <div className="chapter-title">
                  {chapter.title}
                </div>
                {chapter.description && (
                  <div className="chapter-description">
                    {chapter.description}
                  </div>
                )}
              </div>
              <ChevronRight size={16} className="chapter-arrow" />
            </div>
          ))
        )}
      </div>

      {selectedChapter && (
        <div className="selected-chapter-info">
          <h4>Current Chapter</h4>
          <div className="current-chapter">
            <div className="current-chapter-number">
              Chapter {selectedChapter.chapter_number}
            </div>
            <div className="current-chapter-title">
              {selectedChapter.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterList;