
import React, { useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, User } from 'lucide-react';
import { toast } from 'sonner';

const ProfileContent = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);

  // Mock profile data
  const profile = {
    name: 'Rahul Kumar',
    mobile: '9999304120',
    email: 'rahul@example.com',
    balance: 10000,
  };

  // Bank details form
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    ifsc: '',
    bankName: '',
  });

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleBankDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Bank details updated successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    toast.success('Password changed successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    // In a real app, this would clear auth state and redirect
    window.location.href = '/';
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Profile Card */}
      <Card className="shadow-lg">
        <CardHeader className="bg-matka-red text-white">
          <CardTitle>{t('profile')}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mr-4">
              <User className="w-12 h-12 text-gray-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <p className="text-gray-600">{profile.mobile}</p>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p className="text-gray-700">Balance</p>
            <p className="text-2xl font-bold">₹{profile.balance.toFixed(2)}</p>
          </div>

          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Settings</TabsTrigger>
              <TabsTrigger value="banking">Banking Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-4">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      className="pr-10"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-matka-red hover:bg-red-700 text-white"
                >
                  Update Password
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="banking" className="mt-4">
              <form onSubmit={handleBankDetailsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input 
                    id="accountName"
                    value={bankDetails.accountName}
                    onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input 
                    id="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input 
                    id="ifsc"
                    value={bankDetails.ifsc}
                    onChange={(e) => setBankDetails({...bankDetails, ifsc: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input 
                    id="bankName"
                    value={bankDetails.bankName}
                    onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-matka-red hover:bg-red-700 text-white"
                >
                  Save Bank Details
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full border-matka-red text-matka-red hover:bg-red-50"
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const ProfilePage = () => {
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
