
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Home, FileClock, User, History } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-matka-red text-white p-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-bold">{t('appName')}</h1>
        <button 
          onClick={toggleLanguage}
          className="px-3 py-1 bg-white text-matka-red rounded-md font-medium text-sm"
        >
          {language === 'en' ? 'हिंदी' : 'English'}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
        <div className="grid grid-cols-4 h-16">
          <a href="/dashboard" className="flex flex-col items-center justify-center text-center text-gray-700 hover:text-matka-red">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">{t('home')}</span>
          </a>
          <a href="/results" className="flex flex-col items-center justify-center text-center text-gray-700 hover:text-matka-red">
            <FileClock className="w-6 h-6" />
            <span className="text-xs mt-1">{t('results')}</span>
          </a>
          <a href="/history" className="flex flex-col items-center justify-center text-center text-gray-700 hover:text-matka-red">
            <History className="w-6 h-6" />
            <span className="text-xs mt-1">{t('history')}</span>
          </a>
          <a href="/profile" className="flex flex-col items-center justify-center text-center text-gray-700 hover:text-matka-red">
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">{t('profile')}</span>
          </a>
        </div>
      </nav>
      
      {/* Add padding at the bottom to account for fixed nav */}
      <div className="h-16"></div>
    </div>
  );
};

export default DashboardLayout;
