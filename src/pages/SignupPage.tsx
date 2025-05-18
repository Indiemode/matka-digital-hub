
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-green-500 flex items-center justify-center p-4">
        <SignupForm />
      </div>
    </LanguageProvider>
  );
};

export default SignupPage;
