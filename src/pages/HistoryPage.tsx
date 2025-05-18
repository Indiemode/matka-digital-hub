
import React, { useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HistoryContent = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("bets");

  // Mock data for bet history
  const bets = [
    { 
      id: 1, 
      market: 'KALYAN', 
      date: '18-05-2025',
      numbers: '78',
      amount: 100,
      status: 'Pending',
    },
    { 
      id: 2, 
      market: 'MILAN DAY', 
      date: '17-05-2025',
      numbers: '45',
      amount: 200,
      status: 'Won',
    },
    { 
      id: 3, 
      market: 'MAIN BAZAR', 
      date: '17-05-2025',
      numbers: '12',
      amount: 150,
      status: 'Lost',
    },
  ];

  // Mock data for transactions
  const transactions = [
    { 
      id: 1, 
      type: 'Deposit', 
      date: '18-05-2025',
      amount: 1000,
      status: 'Completed',
    },
    { 
      id: 2, 
      type: 'Withdrawal', 
      date: '17-05-2025',
      amount: 500,
      status: 'Pending',
    },
    { 
      id: 3, 
      type: 'Deposit', 
      date: '16-05-2025',
      amount: 2000,
      status: 'Completed',
    },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-matka-red text-white">
        <CardTitle>{t('history')}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="bets" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bets">Bet History</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="bets">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('market')}</TableHead>
                  <TableHead>{t('date')}</TableHead>
                  <TableHead>Numbers</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bets.map((bet) => (
                  <TableRow key={bet.id}>
                    <TableCell className="font-medium">{bet.market}</TableCell>
                    <TableCell>{bet.date}</TableCell>
                    <TableCell>{bet.numbers}</TableCell>
                    <TableCell>₹{bet.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          bet.status === 'Won' 
                            ? 'bg-green-100 text-green-800' 
                            : bet.status === 'Lost'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {bet.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="transactions">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>{t('date')}</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.type}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>₹{transaction.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          transaction.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const HistoryPage = () => {
  const pageTitleKey = 'history';

  return (
    <LanguageProvider>
      <DashboardLayout title={pageTitleKey}>
        <HistoryContent />
      </DashboardLayout>
    </LanguageProvider>
  );
};

export default HistoryPage;
