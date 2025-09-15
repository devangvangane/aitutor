import type { Route } from "./+types/language";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Select Language - React Router App" },
    { name: "description", content: "Choose your preferred language" },
  ];
}

export default function LanguageSelection() {
  const navigate = useNavigate();
  const { setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleLanguageSelect = (language: 'en' | 'hi' | 'gu') => {
    setSelectedLanguage(language);
    setLanguage(language);
    // Navigate to standards page after language selection
    navigate('/standards');
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('language.select')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('language.choose')}
            </p>
          </div>

          {/* Language Options */}
          <div className="space-y-4">
            {/* English Button */}
            <button
              onClick={() => handleLanguageSelect('en')}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedLanguage === 'en'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EN</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {t('language.english')}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t('language.continue.en')}
                  </div>
                </div>
              </div>
            </button>

            {/* Hindi Button */}
            <button
              onClick={() => handleLanguageSelect('hi')}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedLanguage === 'hi'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500'
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">हि</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {t('language.hindi')}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t('language.continue.hi')}
                  </div>
                </div>
              </div>
            </button>

            {/* Gujarati Button */}
            <button
              onClick={() => handleLanguageSelect('gu')}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedLanguage === 'gu'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500'
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ગુ</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {t('language.gujarati')}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t('language.continue.gu')}
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('language.changeLater')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
