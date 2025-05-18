
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFoundContent = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-matka-red mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Button 
          className="bg-matka-red hover:bg-red-700 text-white"
          asChild
        >
          <a href="/dashboard">{t('home')}</a>
        </Button>
      </div>
    </div>
  );
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <NotFoundContent />
    </LanguageProvider>
  );
};

export default NotFound;
