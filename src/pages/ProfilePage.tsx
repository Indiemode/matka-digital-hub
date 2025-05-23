
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ProfileContent from '../components/ProfileContent';

const ProfilePage = () => {
  return (
    <DashboardLayout title="Profile">
      <ProfileContent />
    </DashboardLayout>
  );
};

export default ProfilePage;
