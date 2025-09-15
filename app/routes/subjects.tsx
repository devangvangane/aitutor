import type { Route } from "./+types/subjects";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Select Subjects - React Router App" },
    { name: "description", content: "Choose your subjects for 10th standard" },
  ];
}

export default function SubjectsSelection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = [
    { id: 'maths', name: t('subjects.maths'), color: 'blue' },
    { id: 'science', name: t('subjects.science'), color: 'green' },
    { id: 'english', name: t('subjects.english'), color: 'purple' },
    { id: 'hindi', name: t('subjects.hindi'), color: 'orange' },
    { id: 'gujarati', name: t('subjects.gujarati'), color: 'teal' },
    { id: 'social', name: t('subjects.social'), color: 'red' },
    { id: 'sanskrit', name: t('subjects.sanskrit'), color: 'indigo' },
    { id: 'computer', name: t('subjects.computer'), color: 'pink' },
  ];

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };

  const handleContinue = () => {
    // Store selected subject in localStorage
    if (selectedSubject) {
      localStorage.setItem('selectedSubject', selectedSubject);
    }
    // Navigate to home page after subject selection
    navigate('/');
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap = {
      blue: isSelected 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' 
        : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500',
      green: isSelected 
        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' 
        : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500',
      purple: isSelected 
        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg' 
        : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500',
      orange: isSelected 
        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg' 
        : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500',
      teal: isSelected 
        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 shadow-lg' 
        : 'border-gray-200 dark:border-gray-600 hover:border-teal-300 dark:hover:border-teal-500',
      red: isSelected 
        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 shadow-lg' 
        : 'border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-500',
      indigo: isSelected 
        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg' 
        : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500',
      pink: isSelected 
        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 shadow-lg' 
        : 'border-gray-200 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-500',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      teal: 'bg-teal-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500',
      pink: 'bg-pink-500',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl w-full mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('subjects.select')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('subjects.choose')}
            </p>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {subjects.map((subject) => {
              const isSelected = selectedSubject === subject.id;
              return (
                <button
                  key={subject.id}
                  onClick={() => handleSubjectSelect(subject.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${getColorClasses(subject.color, isSelected)}`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 ${getIconColor(subject.color)} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-white font-bold text-lg">
                        {subject.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {subject.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Subject Summary */}
          {selectedSubject && (
            <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('subjects.selected')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const subject = subjects.find(s => s.id === selectedSubject);
                  return (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getIconColor(subject?.color || 'blue')}`}
                    >
                      {subject?.name}
                    </span>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={handleContinue}
              disabled={!selectedSubject}
              className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                selectedSubject
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {t('subjects.continue')}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('subjects.changeLater')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
