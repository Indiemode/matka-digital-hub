
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DashboardContent = () => {
  const { t } = useLanguage();

  // Mock data for the dashboard
  const markets = [
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

  const recentResults = [
    { id: 1, market: 'KALYAN', date: '17-05-2025', result: '780-5' },
    { id: 2, market: 'MILAN DAY', date: '17-05-2025', result: '450-9' },
    { id: 3, market: 'MAIN BAZAR', date: '17-05-2025', result: '125-8' },
  ];

  return (
    <>
      <div className="space-y-6 pb-16">
        {/* User Balance Card */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">User Balance</p>
                <p className="text-2xl font-bold">₹10,000.00</p>
              </div>
              <Button className="bg-matka-red hover:bg-red-700 text-white">Add Money</Button>
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
                  {recentResults.map((result) => (
                    <tr key={result.id} className="border-b">
                      <td className="py-2 font-medium">{result.market}</td>
                      <td className="py-2 text-sm text-gray-600">{result.date}</td>
                      <td className="py-2 font-bold text-matka-red">{result.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button 
                variant="outline" 
                className="mt-4 w-full border-matka-red text-matka-red hover:bg-red-50"
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
