
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardLayout from '../components/DashboardLayout';
import BettingGrid from '../components/BettingGrid';

const BettingPage = () => {
  const pageTitleKey = 'selectBet';

  return (
    <LanguageProvider>
      <DashboardLayout title={pageTitleKey}>
        <BettingGrid />
      </DashboardLayout>
    </LanguageProvider>
  );
};

export default BettingPage;
