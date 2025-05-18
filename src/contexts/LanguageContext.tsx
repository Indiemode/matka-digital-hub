
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the types for our translations
type Translations = {
  [key: string]: {
    en: string;
    hi: string;
  };
};

// Define the translations
const translations: Translations = {
  appName: {
    en: "MK-STAR",
    hi: "MK-स्टार",
  },
  login: {
    en: "Login",
    hi: "लॉगिन",
  },
  signup: {
    en: "Signup",
    hi: "साइनअप",
  },
  mobileNumber: {
    en: "Mobile No.",
    hi: "मोबाइल नं.",
  },
  password: {
    en: "Password",
    hi: "पासवर्ड",
  },
  forgetPassword: {
    en: "Forget Login Password",
    hi: "लॉगिन पासवर्ड भूल गए",
  },
  joinWhatsApp: {
    en: "Join WhatsApp Group",
    hi: "व्हाट्सऐप ग्रुप ज्वाइन करें",
  },
  joinTelegram: {
    en: "Join Telegram Group",
    hi: "टेलीग्राम ग्रुप ज्वाइन करें",
  },
  joinYoutube: {
    en: "Join Youtube Channel",
    hi: "यूट्यूब चैनल ज्वाइन करें",
  },
  home: {
    en: "Home",
    hi: "होम",
  },
  results: {
    en: "Results",
    hi: "परिणाम",
  },
  history: {
    en: "History",
    hi: "इतिहास",
  },
  profile: {
    en: "Profile",
    hi: "प्रोफाइल",
  },
  save: {
    en: "Save",
    hi: "सेव",
  },
  cancel: {
    en: "Cancel",
    hi: "रद्द करें",
  },
  selectBet: {
    en: "Select Bet",
    hi: "बेट चुनें",
  },
  amount: {
    en: "Amount",
    hi: "राशि",
  },
  placeBet: {
    en: "Place Bet",
    hi: "बेट लगाएं",
  },
  yourCode: {
    en: "Your Code",
    hi: "आपका कोड",
  },
  date: {
    en: "Date",
    hi: "तिथि",
  },
  day: {
    en: "Day",
    hi: "दिन",
  },
  paymentMethods: {
    en: "Payment Methods",
    hi: "भुगतान विधियां",
  },
  makePayment: {
    en: "Make Payment",
    hi: "भुगतान करें",
  },
  scanQR: {
    en: "Scan QR Code for payment",
    hi: "भुगतान के लिए QR कोड स्कैन करें",
  },
  paymentNote: {
    en: "Please pay using the QR code or the numbers provided below",
    hi: "कृपया QR कोड या नीचे दिए गए नंबरों का उपयोग करके भुगतान करें",
  },
  submit: {
    en: "Submit",
    hi: "सबमिट",
  },
  select: {
    en: "Select",
    hi: "चुनें",
  },
  total: {
    en: "Total",
    hi: "कुल",
  },
  market: {
    en: "Market",
    hi: "मार्केट",
  },
};

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en'); // Default to English

  // Function to get translation
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language as 'en' | 'hi'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
