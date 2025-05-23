
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import PaymentQRCode from './PaymentQRCode';

const ProfileContent = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          console.error('Error fetching profile:', error);
          toast.error('Failed to load profile data');
        } else if (data) {
          setName(data.name || '');
          setMobileNumber(data.mobile_number || '');
          setBalance(data.balance || 0);
        }
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      toast.error('Something went wrong while loading your profile');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast.error('You must be logged in to update your profile');
        return;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          name: name,
          mobile_number: mobileNumber
        })
        .eq('id', session.user.id);
        
      if (error) {
        console.error('Update error:', error);
        toast.error('Failed to update profile');
      } else {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Something went wrong while updating your profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card className="shadow-md">
        <CardHeader className="bg-matka-red text-white">
          <CardTitle>{t('profile')}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <Input 
                  value={mobileNumber} 
                  onChange={(e) => setMobileNumber(e.target.value)} 
                  placeholder="Your Mobile Number"
                  disabled
                />
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button 
                  onClick={handleUpdateProfile}
                  disabled={isLoading}
                  className="bg-matka-red hover:bg-red-700 text-white"
                >
                  {isLoading ? 'Saving...' : t('save')}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  {t('cancel')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-600">Name:</p>
                <p className="font-medium">{name || 'Not set'}</p>
                
                <p className="text-gray-600">Mobile Number:</p>
                <p className="font-medium">{mobileNumber}</p>
                
                <p className="text-gray-600">Balance:</p>
                <p className="font-medium">₹{balance.toFixed(2)}</p>
              </div>
              
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-matka-red hover:bg-red-700 text-white mt-2"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment QR Code Section */}
      <PaymentQRCode />
    </div>
  );
};

export default ProfileContent;
