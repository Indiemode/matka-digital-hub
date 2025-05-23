
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const BettingGrid = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [betAmount, setBetAmount] = useState<string>('');
  const [market, setMarket] = useState<string>('');
  const [userBalance, setUserBalance] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Today's date for display
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');
  
  const dayName = today.toLocaleDateString('en-IN', { weekday: 'long' });

  // Generate numbers from 1 to 100
  const regularNumbers = Array.from({ length: 100 }, (_, i) => i + 1);
  
  // Special betting codes
  const specialCodes = [
    'B111', 'B222', 'B333', 'B444', 'B555', 'B666', 'B777', 'B888', 'B999', 'B000',
    'A111', 'A222', 'A333', 'A444', 'A555', 'A666', 'A777', 'A888', 'A999', 'A000'
  ];

  // Fetch user data and balance
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          // Redirect to login if not logged in
          navigate('/');
          return;
        }
        
        setUserId(session.user.id);
        
        // Fetch user profile to get balance
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('balance')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }
        
        if (profileData) {
          setUserBalance(profileData.balance);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  const handleNumberClick = (num: number | string) => {
    const numValue = typeof num === 'string' ? num : num;
    
    if (selectedNumbers.includes(Number(numValue))) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== Number(numValue)));
    } else {
      setSelectedNumbers([...selectedNumbers, Number(numValue)]);
    }
  };

  const handlePlaceBet = async () => {
    if (selectedNumbers.length === 0) {
      toast.error('Please select at least one number');
      return;
    }

    if (!betAmount || Number(betAmount) <= 0) {
      toast.error('Please enter a valid bet amount');
      return;
    }

    if (!market) {
      toast.error('Please select a market');
      return;
    }
    
    const totalAmount = selectedNumbers.length * Number(betAmount);
    
    if (totalAmount > userBalance) {
      toast.error('Insufficient balance. Please add money to your wallet.');
      return;
    }
    
    if (!userId) {
      toast.error('You must be logged in to place a bet');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create bet records for each selected number
      const betPromises = selectedNumbers.map(async (number) => {
        return supabase.from('bets').insert({
          user_id: userId,
          bet_number: number.toString(),
          bet_type: market,
          amount: Number(betAmount),
          status: 'pending'
        });
      });
      
      // Wait for all bets to be created
      const results = await Promise.all(betPromises);
      const errors = results.filter(result => result.error);
      
      if (errors.length > 0) {
        console.error('Errors placing bets:', errors);
        toast.error('Some bets could not be placed');
        return;
      }
      
      // Deduct amount from user balance
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ balance: userBalance - totalAmount })
        .eq('id', userId);
        
      if (updateError) {
        console.error('Error updating balance:', updateError);
        toast.error('Failed to update your balance');
        return;
      }
      
      // Update local balance state
      setUserBalance(userBalance - totalAmount);
      
      toast.success('Bets placed successfully!');
      
      // Reset selection
      setSelectedNumbers([]);
      setBetAmount('');
    } catch (error) {
      console.error('Error placing bets:', error);
      toast.error('An error occurred while placing bets');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-matka-red text-white">
        <CardTitle className="text-xl">{t('selectBet')}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="text-gray-700">Your Balance</p>
          <p className="text-xl font-bold">₹{userBalance.toFixed(2)}</p>
        </div>
      
        <div className="mb-4">
          <Select onValueChange={setMarket}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`--- ${t('select')} ---`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crossing">Crossing</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="close">Close</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-md overflow-hidden border border-gray-200">
          <div className="bg-gray-100 p-2 text-sm grid grid-cols-11 text-center">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
              <div key={`header-${num}`} className="font-semibold text-red-600">{num}</div>
            ))}
            <div className="font-semibold text-green-600">{t('total')}</div>
          </div>
          
          <div className="bet-grid grid grid-cols-11 text-center">
            {/* Regular numbers from 1-100 in rows of 10 */}
            {Array.from({ length: 10 }, (_, rowIndex) => (
              <React.Fragment key={`row-${rowIndex}`}>
                {Array.from({ length: 10 }, (_, colIndex) => {
                  const num = rowIndex * 10 + colIndex + 1;
                  return (
                    <div
                      key={`num-${num}`}
                      className={`p-2 border cursor-pointer ${
                        selectedNumbers.includes(num) ? 'bg-red-200 font-bold' : ''
                      }`}
                      onClick={() => handleNumberClick(num)}
                    >
                      {formatNumber(num)}
                      <div className="text-xs text-gray-500">Rs.</div>
                    </div>
                  );
                })}
                <div className="p-2 border bg-green-50 text-green-600 font-bold">
                  {t('total')}
                </div>
              </React.Fragment>
            ))}
            
            {/* Special codes in 2 rows */}
            {[0, 1].map(row => (
              <React.Fragment key={`special-${row}`}>
                {specialCodes.slice(row * 10, (row + 1) * 10).map((code) => (
                  <div
                    key={`code-${code}`}
                    className={`p-2 border cursor-pointer text-blue-600 ${
                      selectedNumbers.includes(Number(code)) ? 'bg-blue-100 font-bold' : ''
                    }`}
                    onClick={() => handleNumberClick(code)}
                  >
                    {code}
                    <div className="text-xs text-gray-500">Rs.</div>
                  </div>
                ))}
                <div className="p-2 border bg-green-50 text-green-600 font-bold">
                  {t('total')}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('amount')}</label>
            <Input 
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="Enter bet amount"
              className="mt-1"
            />
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700">
              {t('selectedBet')}: {selectedNumbers.join(', ')}
            </p>
            <p className="text-sm font-medium text-gray-700">
              {t('totalAmount')}: ₹{selectedNumbers.length * Number(betAmount || 0)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-left">
              <div className="text-sm text-gray-700">{t('date')}: {formattedDate}</div>
              <div className="text-sm text-gray-700">{t('day')}: {dayName}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-700">{t('yourCode')}: {userId ? userId.substring(0, 4) : '----'}</div>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAIAAAD6XpeBAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAADmklEQVR4nO3dy26jQBRA0ZThf/wLd1SqXODaPl3Vz1mjR4qVFLSND9f39/f3H0ru39UfYCaEFxBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXoB/r/oH/PP5fKrHPo7jW/8JhVfL4zge9Zbr8zxv39Xv65F4kozneb5er5/X5dzGdebsz2t9cft+v1fneZ6Px+P709WbrIS3sj7F60NabWr95frzxraCVWRl3PXbqzmV+nrecvgJfF5n9fmfz+f6wvXa7DbXbel2wzV9eEVk5djqwdXR1+nre1bNrB5cnfZfc6vdNdOHV3KdUfVYtanaRA15GdlypqtvKOaKlW/sdGa0liRzrYdr1vDW2VWbWm9ttZb1JKtnX21wtaN17jXT2eFaA/i8p95gDfDta8r/sUmC69PXdPry8FZzrXnV1OpRq2fXd+6237XB2/dXm1pvbj1lpzCnDs9F3A+pdE/CuxJeyXXlXy/Q19916xxtJf0HXs+/VjY7JTh1eOsn9mtN6z+sj7He+O2O1oZ3GtMcUw95r9er+pzzlXHN+OGt7yF3ml42vDu9Bzp1eA6rxzh1eHOFt1OC/lEokPACJr/I++uGenkxLht9BZ86PP8xL+CPw4uyS3grxXULt27+1eO7hfR4PG63wevXz+dzn+XG1OEVajNfr9futke1cp9h9YBCdUovXutOd/pcfhFeaeErReY6cKfJJ4fU4f11HVYlUE36qtlVcA0yd/rc/nl3Jw5v/eRbzaLc/a/uv5Qv0JVvLupz4vDKez3VOrhz7/72u8rbRLe/6fSkk4a3nuL7KHl9jvJOzu1LynedlsclrTE7m0R5G6jcTPXs8nKgunW0c6vIicP75avl1bbKRz2qz1kuzsv7P+XNpd0m95PLpfnf5dXzr5fr5WOlvO1U3iYqV7yTr4e/nTW824di93vCS3j95c52G3J9M+iXr78+fHkpUH7ITrpr/3e2Z7x6p7da3pY7Kj+83+1opzH6h2dEAYQXQHgBhBdAeAGEF0B4AYQX4LTh7XQ7ZwmnDS/oswNuQXgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF+AHNVM9FUGkf6YAAAAASUVORK5CYII=" 
                alt="QR Code" className="inline-block w-16 h-16" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="bg-blue-400 text-white" onClick={() => navigate('/payment')}>M-Pay</Button>
            <Button variant="outline" className="bg-green-500 text-white" onClick={() => navigate('/payment')}>Paytm</Button>
            <Button variant="outline" className="bg-yellow-500 text-white" onClick={() => navigate('/payment')}>Google</Button>
          </div>
          
          <Button 
            onClick={handlePlaceBet}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : t('save')}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BettingGrid;
