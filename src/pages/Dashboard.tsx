
import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface Market {
  id: number;
  name: string;
  openTime: string;
  closeTime: string;
  status: 'open' | 'closed';
}

interface Result {
  id: string;
  market_name: string;
  result_date: string;
  open_result: string | null;
  close_result: string | null;
}

const DashboardContent = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);
  const [recentResults, setRecentResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mock market data (this would normally come from an API)
  const markets: Market[] = [
    { 
      id: 1, 
      name: 'KALYAN', 
      openTime: '11:15 AM', 
      closeTime: '01:30 PM',
      status: 'open'
    },
    { 
      id: 2, 
      name: 'MILAN DAY', 
      openTime: '02:00 PM', 
      closeTime: '04:00 PM',
      status: 'open'
    },
    { 
      id: 3, 
      name: 'MAIN BAZAR', 
      openTime: '09:05 PM', 
      closeTime: '11:45 PM',
      status: 'closed'
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          // User not logged in, redirect to login page
          navigate('/');
          return;
        }
        
        // Fetch user balance
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('balance')
          .eq('id', session.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else if (profileData) {
          setBalance(profileData.balance);
        }
        
        // Fetch recent results
        const { data: resultsData, error: resultsError } = await supabase
          .from('results')
          .select('*')
          .order('result_date', { ascending: false })
          .limit(3);
          
        if (resultsError) {
          console.error('Error fetching results:', resultsError);
        } else {
          setRecentResults(resultsData || []);
        }
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);

  const formatResultDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  const handlePlayClick = () => {
    navigate('/bet');
  };

  const handleAddMoney = () => {
    navigate('/payment');
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading dashboard data...</div>;
  }

  return (
    <>
      <div className="space-y-6 pb-16">
        {/* User Balance Card */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">User Balance</p>
                <p className="text-2xl font-bold">₹{balance.toFixed(2)}</p>
              </div>
              <Button className="bg-matka-red hover:bg-red-700 text-white" onClick={handleAddMoney}>Add Money</Button>
            </div>
          </CardContent>
        </Card>

        {/* Markets Section */}
        <div>
          <h3 className="text-lg font-medium mb-2">{t('market')}</h3>
          <div className="space-y-3">
            {markets.map((market) => (
              <Card key={market.id} className="bg-white shadow-md">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">{market.name}</p>
                      <p className="text-sm text-gray-600">
                        {market.openTime} - {market.closeTime}
                      </p>
                    </div>
                    <Button 
                      className={`${
                        market.status === 'open' 
                          ? 'bg-matka-red hover:bg-red-700' 
                          : 'bg-gray-400'
                      } text-white`}
                      disabled={market.status !== 'open'}
                      onClick={handlePlayClick}
                    >
                      {market.status === 'open' ? 'PLAY' : 'CLOSED'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Results Section */}
        <div>
          <h3 className="text-lg font-medium mb-2">{t('results')}</h3>
          <Card className="bg-white shadow-md">
            <CardContent className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">{t('market')}</th>
                    <th className="pb-2">{t('date')}</th>
                    <th className="pb-2">{t('results')}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentResults.length > 0 ? (
                    recentResults.map((result) => (
                      <tr key={result.id} className="border-b">
                        <td className="py-2 font-medium">{result.market_name}</td>
                        <td className="py-2 text-sm text-gray-600">{formatResultDate(result.result_date)}</td>
                        <td className="py-2 font-bold text-matka-red">
                          {result.open_result && result.close_result 
                            ? `${result.open_result}-${result.close_result}` 
                            : 'Pending'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-gray-500">No recent results found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Button 
                variant="outline" 
                className="mt-4 w-full border-matka-red text-matka-red hover:bg-red-50"
                onClick={() => navigate('/results')}
              >
                View All Results
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  const { t } = useLanguage();
  const pageTitleKey = 'home';

  return (
    <LanguageProvider>
      <DashboardLayout title={pageTitleKey}>
        <DashboardContent />
      </DashboardLayout>
    </LanguageProvider>
  );
};

export default Dashboard;
