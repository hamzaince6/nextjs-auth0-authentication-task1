'use client';

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const error = searchParams.get('error');
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Debug logging
  console.log('Login Page - Status:', status);
  console.log('Login Page - Session:', session);
  console.log('Login Page - Callback URL:', callbackUrl);

  useEffect(() => {
    if (session && status === 'authenticated' && !isRedirecting) {
      console.log('Login Page - Redirecting to:', callbackUrl);
      setIsRedirecting(true);
      router.push(callbackUrl);
    }
  }, [session, status, router, callbackUrl, isRedirecting]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (session && status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Redirecting to {callbackUrl}...</p>
          <p className="text-xs text-muted-foreground">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error === 'OAuthSignin' && 'Error signing in with OAuth provider'}
              {error === 'OAuthCallback' && 'Error in OAuth callback'}
              {error === 'OAuthCreateAccount' && 'Could not create OAuth account'}
              {error === 'EmailCreateAccount' && 'Could not create account'}
              {error === 'Callback' && 'Error in callback'}
              {error === 'OAuthAccountNotLinked' && 'Account not linked'}
              {error === 'SessionRequired' && 'Please sign in to access this page'}
              {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount', 'EmailCreateAccount', 'Callback', 'OAuthAccountNotLinked', 'SessionRequired'].includes(error) && 
                'An error occurred during authentication'}
            </AlertDescription>
          </Alert>
        )}

        {/* Login Card */}
        <Card className="border-2">
          <CardHeader className="text-center space-y-2">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Use your Auth0 account to sign in securely
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              onClick={() => signIn('auth0', { callbackUrl })}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              <Shield className="mr-2 h-5 w-5" />
              Continue with Auth0
            </Button>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Secure authentication powered by Auth0
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <span>🔒 SSL Encrypted</span>
                <span>•</span>
                <span>🛡️ OAuth 2.0</span>
                <span>•</span>
                <span>🔑 JWT Tokens</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-primary font-semibold">Secure</div>
            <div className="text-sm text-muted-foreground">Industry standard OAuth</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-primary font-semibold">Fast</div>
            <div className="text-sm text-muted-foreground">Quick single sign-on</div>
          </div>
        </div>
      </div>
    </div>
  );
}