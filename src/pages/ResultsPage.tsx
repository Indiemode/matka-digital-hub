
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ResultsContent = () => {
  const { t } = useLanguage();

  // Mock data for results
  const results = [
    { id: 1, market: 'KALYAN', date: '18-05-2025', day: 'Sunday', result: '780-5' },
    { id: 2, market: 'MILAN DAY', date: '18-05-2025', day: 'Sunday', result: '450-9' },
    { id: 3, market: 'MAIN BAZAR', date: '18-05-2025', day: 'Sunday', result: '125-8' },
    { id: 4, market: 'KALYAN', date: '17-05-2025', day: 'Saturday', result: '390-2' },
    { id: 5, market: 'MILAN DAY', date: '17-05-2025', day: 'Saturday', result: '220-4' },
    { id: 6, market: 'MAIN BAZAR', date: '17-05-2025', day: 'Saturday', result: '678-1' },
    { id: 7, market: 'KALYAN', date: '16-05-2025', day: 'Friday', result: '567-8' },
    { id: 8, market: 'MILAN DAY', date: '16-05-2025', day: 'Friday', result: '890-7' },
    { id: 9, market: 'MAIN BAZAR', date: '16-05-2025', day: 'Friday', result: '234-9' },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-matka-red text-white">
        <CardTitle>{t('results')}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('market')}</TableHead>
              <TableHead>{t('date')}</TableHead>
              <TableHead>{t('day')}</TableHead>
              <TableHead>{t('results')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">{result.market}</TableCell>
                <TableCell>{result.date}</TableCell>
                <TableCell>{result.day}</TableCell>
                <TableCell className="font-bold text-matka-red">{result.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const ResultsPage = () => {
  const pageTitleKey = 'results';

  return (
    <LanguageProvider>
      <DashboardLayout title={pageTitleKey}>
        <ResultsContent />
      </DashboardLayout>
    </LanguageProvider>
  );
};

export default ResultsPage;
