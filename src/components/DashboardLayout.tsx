
import React, { useEffect, useState } from 'react';
import { useLanguage, LanguageProvider } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Home, FileClock, User, History, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayoutContent: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { t, language, setLanguage } = useLanguage();
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set document title
    document.title = `MSM Market - ${t(title)}`;
    
    // Get user profile data
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', session.user.id)
          .single();
          
        if (profileData) {
          setUserName(profileData.name);
        }
      } else {
        // If no session, redirect to login
        navigate('/');
      }
    };
    
    fetchUserProfile();
  }, [title, t, navigate]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-matka-red text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">MSM Market</h1>
          {userName && <span className="ml-2 text-sm">({userName})</span>}
        </div>
        <div className="flex items-center">
          <button 
            onClick={toggleLanguage}
            className="px-3 py-1 bg-white text-matka-red rounded-md font-medium text-sm mr-2"
          >
            {language === 'en' ? 'हिंदी' : 'English'}
          </button>
          <button
            onClick={handleLogout}
            className="p-1"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4">{t(title)}</h2>
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

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  return (
    <LanguageProvider>
      <DashboardLayoutContent {...props} />
    </LanguageProvider>
  );
};

export default DashboardLayout;
