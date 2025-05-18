
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const LoginForm = () => {
  const { t } = useLanguage();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!mobileNumber || !password) {
      toast.error('Please enter both mobile number and password');
      return;
    }

    try {
      setIsLoading(true);
      
      // First, get the user's email from the profiles table using mobile number
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('mobile_number', mobileNumber)
        .single();

      if (profileError || !profileData) {
        console.error('Error fetching profile:', profileError);
        toast.error('Mobile number not registered');
        setIsLoading(false);
        return;
      }
      
      // Now sign in with the user's UUID and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${profileData.id}@msm.market`, // Using UUID as email
        password: password
      });

      if (error) {
        console.error('Error logging in:', error);
        toast.error(error.message || 'Login failed');
        return;
      }

      toast.success('Login successful!');
      // Navigate to dashboard after login
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const goToSignup = () => {
    window.location.href = '/signup';
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="bg-matka-red text-white text-center py-4">
        <CardTitle className="text-2xl font-bold">{t('MSM Market')}</CardTitle>
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
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : t('login')}
          </Button>

          <div className="text-center text-sm mt-4">
            <p className="text-gray-800">मार्केट डाल सकते हो। 01-02-2025 से।</p>
          </div>

          <div className="text-center mt-2">
            <p className="text-sm">
              Forgot password? Call customer care: <a href="tel:+911234567890" className="text-matka-red font-bold">123-456-7890</a>
            </p>
          </div>

          <Button 
            variant="outline"
            type="button"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2"
            onClick={goToSignup}
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
