import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextAuth + Auth0 App',
  description: 'Secure authentication with Auth0 and NextAuth.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}