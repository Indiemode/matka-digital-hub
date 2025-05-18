
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const PaymentQRCode = () => {
  const { t } = useLanguage();

  // Demo QR code - in a real app, this would be generated dynamically
  const qrCode = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAIAAAD6XpeBAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAADmklEQVR4nO3dy26jQBRA0ZThf/wLd1SqXODaPl3Vz1mjR4qVFLSND9f39/f3H0ru39UfYCaEFxBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXgDhBRBeAOEFEF4A4QUQXoB/r/oH/PP5fKrHPo7jW/8JhVfL4zge9Zbr8zxv39Xv65F4kozneb5er5/X5dzGdebsz2t9cft+v1fneZ6Px+P709WbrIS3sj7F60NabWr95frzxraCVWRl3PXbqzmV+nrecvgJfF5n9fmfz+f6wvXa7DbXbel2wzV9eEVk5djqwdXR1+nre1bNrB5cnfZfc6vdNdOHV3KdUfVYtanaRA15GdlypqtvKOaKlW/sdGa0liRzrYdr1vDW2VWbWm9ttZb1JKtnX21wtaN17jXT2eFaA/i8p95gDfDta8r/sUmC69PXdPry8FZzrXnV1OpRq2fXd+6237XB2/dXm1pvbj1lpzCnDs9F3A+pdE/CuxJeyXXlXy/Q19916xxtJf0HXs+/VjY7JTh1eOsn9mtN6z+sj7He+O2O1oZ3GtMcUw95r9er+pzzlXHN+OGt7yF3ml42vDu9Bzp1eA6rxzh1eHOFt1OC/lEokPACJr/I++uGenkxLht9BZ86PP8xL+CPw4uyS3grxXULt27+1eO7hfR4PG63wevXz+dzn+XG1OEVajNfr9futke1cp9h9YBCdUovXutOd/pcfhFeaeErReY6cKfJJ4fU4f11HVYlUE36qtlVcA0yd/rc/nl3Jw5v/eRbzaLc/a/uv5Qv0JVvLupz4vDKez3VOrhz7/72u8rbRLe/6fSkk4a3nuL7KHl9jvJOzu1LynedlsclrTE7m0R5G6jcTPXs8nKgunW0c6vIicP75avl1bbKRz2qz1kuzsv7P+XNpd0m95PLpfnf5dXzr5fr5WOlvO1U3iYqV7yTr4e/nTW824di93vCS3j95c52G3J9M+iXr78+fHkpUH7ITrpr/3e2Z7x6p7da3pY7Kj+83+1opzH6h2dEAYQXQHgBhBdAeAGEF0B4AYQX4LTh7XQ7ZwmnDS/oswNuQXgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF0B4AYQXQHgBhBdAeAGEF+AHNVM9FUGkf6YAAAAASUVORK5CYII=";
  const phone1 = "9999304120";
  const phone2 = "9528546586";

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-matka-red text-white">
        <CardTitle className="text-xl">{t('makePayment')}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <div className="mb-6">
          <img 
            src={qrCode} 
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
        </div>
        
        <div className="mt-4 text-gray-600">Thank You</div>
        
        <div className="mt-8">
          <Button 
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg"
          >
            OK
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentQRCode;
