import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'hi' | 'gu';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations = {
  en: {
    'welcome.title': 'Welcome to React Router',
    'welcome.subtitle': 'A modern web framework for React',
    'language.select': 'Select Language',
    'language.choose': 'Choose your preferred language',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.continue.en': 'Continue in English',
    'language.continue.hi': 'हिंदी में जारी रखें',
    'language.changeLater': 'You can change this setting later in your profile',
    'standards.select': 'Select Your Standard',
    'standards.choose': 'Choose your educational standard',
    'standards.eighth': '8th Standard',
    'standards.ninth': '9th Standard',
    'standards.tenth': '10th Standard',
    'standards.eleventh': '11th Standard',
    'standards.twelfth': '12th Standard',
    'standards.eighthDesc': 'Middle School Completion',
    'standards.ninthDesc': 'High School Preparation',
    'standards.tenthDesc': 'Secondary School Certificate',
    'standards.eleventhDesc': 'Higher Secondary First Year',
    'standards.twelfthDesc': 'Higher Secondary Second Year',
    'standards.changeLater': 'You can change this setting later in your profile',
    'subjects.select': 'Select Your Subject',
    'subjects.choose': 'Choose one subject for your standard',
    'subjects.selected': 'Selected Subject',
    'subjects.continue': 'Continue',
    'subjects.changeLater': 'You can change this setting later in your profile',
    'subjects.maths': 'Mathematics',
    'subjects.science': 'Science',
    'subjects.english': 'English',
    'subjects.hindi': 'Hindi',
    'subjects.gujarati': 'Gujarati',
    'subjects.social': 'Social Studies',
    'subjects.sanskrit': 'Sanskrit',
    'subjects.computer': 'Computer Science',
  },
  hi: {
    'welcome.title': 'रिएक्ट राउटर में आपका स्वागत है',
    'welcome.subtitle': 'रिएक्ट के लिए एक आधुनिक वेब फ्रेमवर्क',
    'language.select': 'भाषा चुनें',
    'language.choose': 'अपनी पसंदीदा भाषा चुनें',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.continue.en': 'Continue in English',
    'language.continue.hi': 'हिंदी में जारी रखें',
    'language.changeLater': 'आप बाद में अपनी प्रोफ़ाइल में इस सेटिंग को बदल सकते हैं',
    'standards.select': 'अपना मानक चुनें',
    'standards.choose': 'अपना शैक्षिक मानक चुनें',
    'standards.eighth': '8वीं कक्षा',
    'standards.ninth': '9वीं कक्षा',
    'standards.tenth': '10वीं कक्षा',
    'standards.eleventh': '11वीं कक्षा',
    'standards.twelfth': '12वीं कक्षा',
    'standards.eighthDesc': 'मध्य विद्यालय पूर्णता',
    'standards.ninthDesc': 'उच्च विद्यालय तैयारी',
    'standards.tenthDesc': 'माध्यमिक विद्यालय प्रमाणपत्र',
    'standards.eleventhDesc': 'उच्च माध्यमिक प्रथम वर्ष',
    'standards.twelfthDesc': 'उच्च माध्यमिक द्वितीय वर्ष',
    'standards.changeLater': 'आप बाद में अपनी प्रोफ़ाइल में इस सेटिंग को बदल सकते हैं',
    'subjects.select': 'अपना विषय चुनें',
    'subjects.choose': 'अपने धोरण के लिए एक विषय चुनें',
    'subjects.selected': 'चयनित विषय',
    'subjects.continue': 'जारी रखें',
    'subjects.changeLater': 'आप बाद में अपनी प्रोफ़ाइल में इस सेटिंग को बदल सकते हैं',
    'subjects.maths': 'गणित',
    'subjects.science': 'विज्ञान',
    'subjects.english': 'अंग्रेजी',
    'subjects.hindi': 'हिंदी',
    'subjects.gujarati': 'गुजराती',
    'subjects.social': 'सामाजिक अध्ययन',
    'subjects.sanskrit': 'संस्कृत',
    'subjects.computer': 'कंप्यूटर विज्ञान',
  },
  gu: {
    'welcome.title': 'રીએક્ટ રાઉટરમાં આપનું સ્વાગત છે',
    'welcome.subtitle': 'રીએક્ટ માટે એક આધુનિક વેબ ફ્રેમવર્ક',
    'language.select': 'ભાષા પસંદ કરો',
    'language.choose': 'તમારી પસંદગીની ભાષા પસંદ કરો',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.gujarati': 'ગુજરાતી',
    'language.continue.en': 'Continue in English',
    'language.continue.hi': 'हिंदी में जारी रखें',
    'language.continue.gu': 'ગુજરાતીમાં ચાલુ રાખો',
    'language.changeLater': 'તમે પછીથી તમારી પ્રોફાઇલમાં આ સેટિંગ બદલી શકો છો',
    'standards.select': 'તમારો ધોરણ પસંદ કરો',
    'standards.choose': 'તમારો શૈક્ષણિક ધોરણ પસંદ કરો',
    'standards.eighth': '8મો ધોરણ',
    'standards.ninth': '9મો ધોરણ',
    'standards.tenth': '10મો ધોરણ',
    'standards.eleventh': '11મો ધોરણ',
    'standards.twelfth': '12મો ધોરણ',
    'standards.eighthDesc': 'મધ્ય શાળા પૂર્ણતા',
    'standards.ninthDesc': 'હાઈ સ્કૂલ તૈયારી',
    'standards.tenthDesc': 'માધ્યમિક શાળા પ્રમાણપત્ર',
    'standards.eleventhDesc': 'ઉચ્ચ માધ્યમિક પ્રથમ વર્ષ',
    'standards.twelfthDesc': 'ઉચ્ચ માધ્યમિક દ્વિતીય વર્ષ',
    'standards.changeLater': 'તમે પછીથી તમારી પ્રોફાઇલમાં આ સેટિંગ બદલી શકો છો',
    'subjects.select': 'તમારો વિષય પસંદ કરો',
    'subjects.choose': 'તમારા ધોરણ માટે એક વિષય પસંદ કરો',
    'subjects.selected': 'પસંદ કરેલો વિષય',
    'subjects.continue': 'ચાલુ રાખો',
    'subjects.changeLater': 'તમે પછીથી તમારી પ્રોફાઇલમાં આ સેટિંગ બદલી શકો છો',
    'subjects.maths': 'ગણિત',
    'subjects.science': 'વિજ્ઞાન',
    'subjects.english': 'અંગ્રેજી',
    'subjects.hindi': 'હિંદી',
    'subjects.gujarati': 'ગુજરાતી',
    'subjects.social': 'સામાજિક અભ્યાસ',
    'subjects.sanskrit': 'સંસ્કૃત',
    'subjects.computer': 'કમ્પ્યુટર વિજ્ઞાન',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi' || savedLanguage === 'gu')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
