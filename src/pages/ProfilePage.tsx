
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardLayout from '../components/DashboardLayout';
import ProfileContent from '../components/ProfileContent';

const ProfilePage = () => {
  const { t } = useLanguage();
  const pageTitleKey = 'profile';

  return (
    <LanguageProvider>
      <DashboardLayout title={pageTitleKey}>
        <ProfileContent />
      </DashboardLayout>
    </LanguageProvider>
  );
};

export default ProfilePage;
