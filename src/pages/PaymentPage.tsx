
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardLayout from '../components/DashboardLayout';
import PaymentQRCode from '../components/PaymentQRCode';

const PaymentPage = () => {
  const pageTitleKey = 'makePayment';

  return (
    <LanguageProvider>
      <DashboardLayout title={pageTitleKey}>
        <PaymentQRCode />
      </DashboardLayout>
    </LanguageProvider>
  );
};

export default PaymentPage;
