
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const SignupForm = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
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

    // In a real application, you would connect to Supabase here
    console.log('Signup attempt with:', { name, mobileNumber, email, password });

    // Simulate successful signup
    toast.success('Account created successfully!');
    // Redirect to login page
    window.location.href = '/';
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="bg-matka-red text-white text-center py-4">
        <CardTitle className="text-2xl font-bold">{t('signup')}</CardTitle>
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
              <Mail className="h-5 w-5 text-white" />
            </div>
            <Input
              type="email"
              placeholder="Email (Optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          >
            {t('signup')}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/" className="text-matka-red hover:underline">
                {t('login')}
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
