
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const PaymentQRCode = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the PhonePe QR code image
  const phonepeQRCode = "/lovable-uploads/3505c347-103d-4321-8788-18ca24b96e26.png";
  const phone1 = "9999304120";
  const phone2 = "9528546586";
  const upiId = "Q188686344@ybl";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (!utrNumber) {
      toast.error('Please enter UTR number');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast.error('You must be logged in to make a payment');
        navigate('/');
        return;
      }
      
      // Create a transaction record
      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: session.user.id,
          amount: parseFloat(amount),
          utr_number: utrNumber,
          transaction_type: 'deposit',
          status: 'pending'
        });
      
      if (error) {
        console.error('Transaction error:', error);
        toast.error('Failed to process payment request');
        return;
      }
      
      toast.success('Payment request submitted successfully! It will be processed soon.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred while processing your payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-matka-red text-white">
        <CardTitle className="text-xl">{t('makePayment')}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <div className="mb-6">
          <img 
            src={phonepeQRCode} 
            alt="Payment QR Code" 
            className="mx-auto w-48 h-48 border-2 border-gray-300 p-2"
          />
        </div>
        
        <p className="text-red-600 mb-4 font-medium">
          आज से सभी भाई ऊपर दिए गए QR-कोड पर ही पेमेंट करेंगे। यदि QR कोड पर पेमेंट ना हो तो ऐसी स्थिति में नीचे दिए गए दोनों नंबर पर आप पेमेंट कर सकते है।
        </p>
        
        <div className="space-y-2 text-lg font-bold text-red-600">
          <div>{phone1}</div>
          <div>{phone2}</div>
          <div className="text-blue-600 mt-2">UPI ID: {upiId}</div>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-center"
            />
          </div>
          
          <div>
            <Input
              type="text"
              placeholder="Enter UTR Number"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              className="text-center"
            />
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg"
          >
            {isSubmitting ? 'Processing...' : 'Submit Payment'}
          </Button>
        </form>
        
        <div className="mt-4 text-gray-600">Thank You</div>
      </CardContent>
    </Card>
  );
};

export default PaymentQRCode;
