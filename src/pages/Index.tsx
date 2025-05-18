
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import LoginForm from '../components/LoginForm';

const Index = () => {
  // Set document title
  React.useEffect(() => {
    document.title = "MSM Market - Login";
  }, []);
  
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-green-500 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </LanguageProvider>
  );
};

export default Index;
