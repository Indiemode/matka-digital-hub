
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  // Set document title
  React.useEffect(() => {
    document.title = "MSM Market - Sign Up";
  }, []);
  
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-green-500 flex items-center justify-center p-4">
        <SignupForm />
      </div>
    </LanguageProvider>
  );
};

export default SignupPage;
