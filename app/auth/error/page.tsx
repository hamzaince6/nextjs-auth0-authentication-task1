'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  const getErrorDetails = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return {
          title: 'Auth0 Konfigürasyon Hatası',
          description: 'Auth0 ayarlarında bir sorun var. Lütfen environment variables ve Auth0 dashboard ayarlarını kontrol edin.',
          details: [
            'AUTH0_CLIENT_ID doğru mu?',
            'AUTH0_CLIENT_SECRET doğru mu?',
            'AUTH0_ISSUER_BASE_URL doğru mu?',
            'Auth0 dashboard\'da callback URL\'ler doğru mu?'
          ]
        };
      case 'AccessDenied':
        return {
          title: 'Erişim Reddedildi',
          description: 'Giriş işlemi iptal edildi veya reddedildi.',
          details: []
        };
      default:
        return {
          title: 'Kimlik Doğrulama Hatası',
          description: errorDescription || 'Bilinmeyen bir hata oluştu.',
          details: []
        };
    }
  };

  const errorInfo = getErrorDetails(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl text-red-600">{errorInfo.title}</CardTitle>
          <CardDescription>{errorInfo.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorInfo.details.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {errorInfo.details.map((detail, index) => (
                    <li key={index} className="text-sm">{detail}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex flex-col space-y-2">
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Ana Sayfaya Dön
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Tekrar Dene
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}