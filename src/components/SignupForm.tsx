
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const SignupForm = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !mobileNumber || !password || !confirmPassword) {
      toast.error('Please fill all required fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      
      // Check if mobile number already exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('mobile_number', mobileNumber)
        .maybeSingle();
      
      if (existingProfile) {
        toast.error('Mobile number already registered');
        setIsLoading(false);
        return;
      }
      
      // Create a valid email using the mobile number + domain
      // This ensures the email is valid while still being unique per user
      const email = `${mobileNumber}@msm.market`;
      
      // Create the auth user with a valid email format
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name
          }
        }
      });
      
      if (authError) {
        console.error('Error creating user:', authError);
        toast.error(authError.message || 'Failed to create account');
        return;
      }
      
      if (!authData.user) {
        toast.error('Failed to create user account');
        return;
      }
      
      // Create the profile with the mobile number
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          name: name,
          mobile_number: mobileNumber
        });
      
      if (profileError) {
        console.error('Error creating profile:', profileError);
        toast.error('Failed to create user profile');
        return;
      }

      toast.success('Account created successfully!');
      // Redirect to login page
      window.location.href = '/';
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="bg-matka-red text-white text-center py-4">
        <CardTitle className="text-2xl font-bold">{t('MSM Market - Sign Up')}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="bg-matka-red p-3">
              <User className="h-5 w-5 text-white" />
            </div>
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0"
            />
          </div>
          
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="bg-matka-red p-3">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <Input
              type="tel"
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
          
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="bg-matka-red p-3">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-matka-red hover:bg-red-700 text-white py-3"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : t('signup')}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/" className="text-matka-red hover:underline">
                {t('login')}
              </a>
            </p>
          </div>
          
          <div className="text-center text-xs text-gray-500 mt-2">
            <p>By signing up, you agree to our Terms & Conditions and Privacy Policy</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
