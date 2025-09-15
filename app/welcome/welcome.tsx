import { useLanguage } from "../contexts/LanguageContext";

export function Welcome() {
  const { t } = useLanguage();
  
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('welcome.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t('welcome.subtitle')}
        </p>
      </div>
    </main>
  );
}
