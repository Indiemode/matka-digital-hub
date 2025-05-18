
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const LoginForm = () => {
  const { t } = useLanguage();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!mobileNumber || !password) {
      toast.error('Please enter both mobile number and password');
      return;
    }

    // In a real application, you would connect to Supabase here
    // For now, we'll just simulate a login
    console.log('Login attempt with:', { mobileNumber, password });

    // Simulate successful login
    toast.success('Login successful!');
    // Navigate to dashboard after login
    window.location.href = '/dashboard';
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="bg-matka-red text-white text-center py-4">
        <CardTitle className="text-2xl font-bold">{t('appName')}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="bg-matka-red p-3">
              <User className="h-5 w-5 text-white" />
            </div>
            <Input
              type="text"
              placeholder={t('mobileNumber')}
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0"
            />
          </div>

          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="bg-matka-red p-3">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <Input
              type="password"
              placeholder={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-matka-red hover:bg-red-700 text-white py-3"
          >
            {t('login')}
          </Button>

          <div className="text-center text-sm mt-4">
            <p className="text-gray-800">मार्केट डाल सकते हो। 01-02-2025 से।</p>
          </div>

          <Button 
            variant="outline"
            type="button"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2"
          >
            {t('forgetPassword')}
          </Button>

          <Button 
            variant="outline"
            type="button"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2"
          >
            {t('signup')}
          </Button>

          <Button 
            variant="outline"
            type="button"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2"
          >
            {t('joinWhatsApp')}
          </Button>

          <Button 
            variant="outline"
            type="button"
            className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2"
          >
            {t('joinTelegram')}
          </Button>

          <Button 
            variant="outline"
            type="button"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2"
          >
            {t('joinYoutube')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
