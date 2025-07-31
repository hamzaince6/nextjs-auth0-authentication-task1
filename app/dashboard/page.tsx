'use client';

import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Calendar, Shield, Key, Clock, Info, CheckCircle, Bug } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // Debug information
  console.log('Dashboard - Session Status:', status);
  console.log('Dashboard - Session Data:', session);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
          
          {/* Debug Info */}
          <Alert className="max-w-md mx-auto">
            <Bug className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">Debug Bilgisi</p>
                <p className="text-sm">
                  <strong>Status:</strong> {status}
                </p>
                <p className="text-sm">
                  <strong>Session:</strong> {session ? 'Available' : 'Not available'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Bu sayfa loading durumunda kalıyor. Session verilerini kontrol edin.
                </p>
              </div>
            </AlertDescription>
          </Alert>
          
          {/* Info Box */}
          <Alert className="max-w-md mx-auto">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">Auth0 Konfigürasyon Bilgisi</p>
                <p className="text-sm">
                  <strong>Application Login URI</strong> alanını doldurduğunuzda hata aldığınız için bu sayfa dönüyor. 
                  Sağ üst köşeden kontrol edin - sistem giriş yapabildi.
                </p>
                <div className="text-xs space-y-1">
                  <p><strong>Çözüm:</strong> Auth0 Dashboard'da Application Login URI alanını boş bırakın.</p>
                  <p><strong>Neden:</strong> Bu alan zorunlu değildir ve local geliştirme için doldurulması gerekmez.</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <div className="text-red-500">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Authentication Required</h2>
            <p className="text-muted-foreground">Please sign in to access the dashboard</p>
          </div>
          
          {/* Debug Info */}
          <Alert className="max-w-md mx-auto">
            <Bug className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">Debug Bilgisi</p>
                <p className="text-sm">
                  <strong>Status:</strong> {status}
                </p>
                <p className="text-sm">
                  <strong>Session:</strong> {session ? 'Available' : 'Not available'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Session bulunamadı. Giriş yapmanız gerekiyor.
                </p>
              </div>
            </AlertDescription>
          </Alert>
          
          {/* Info Box */}
          <Alert className="max-w-md mx-auto">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">Auth0 Konfigürasyon Bilgisi</p>
                <p className="text-sm">
                  <strong>Application Login URI</strong> alanını doldurduğunuzda hata aldığınız için bu sayfa dönüyor. 
                  Sağ üst köşeden kontrol edin - sistem giriş yapabildi.
                </p>
                <div className="text-xs space-y-1">
                  <p><strong>Çözüm:</strong> Auth0 Dashboard'da Application Login URI alanını boş bırakın.</p>
                  <p><strong>Neden:</strong> Bu alan zorunlu değildir ve local geliştirme için doldurulması gerekmez.</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user.name || 'User'}! Here's your account overview.
        </p>
      </div>

      {/* Success Alert */}
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <div className="space-y-2">
            <p className="font-medium">✅ Başarıyla Giriş Yapıldı!</p>
            <p className="text-sm">
              Auth0 ile kimlik doğrulama başarılı. Session bilgileri yüklendi.
            </p>
            <div className="text-xs space-y-1">
              <p><strong>Durum:</strong> Oturum aktif</p>
              <p><strong>Kullanıcı:</strong> {session.user.name || session.user.email}</p>
              <p><strong>Provider:</strong> Auth0</p>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Profile Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={session.user.image || undefined} alt={session.user.name || ''} />
                <AvatarFallback className="text-lg">
                  {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{session.user.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{session.user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Auth0 User</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Account Type</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">
                    <Shield className="w-3 h-3 mr-1" />
                    Auth0 User
                  </Badge>
                  <Badge variant="secondary">
                    <User className="w-3 h-3 mr-1" />
                    Standard Account
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Available Features</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Profile Management
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Secure Authentication
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Session Management
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    OAuth 2.0
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Session Info
            </CardTitle>
            <CardDescription>Current session details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Active
                </Badge>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Provider</span>
                <span className="text-sm font-medium">Auth0</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Token Type</span>
                <span className="text-sm font-medium">JWT</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Expires</span>
                <span className="text-sm font-medium">
                  {new Date(session.expires).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Access Token</span>
                <span className="text-sm font-medium">
                  {(session as any).accessToken ? 'Available' : 'Not available'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <User className="h-6 w-6 mb-2 text-primary" />
                <h4 className="font-medium">Update Profile</h4>
                <p className="text-sm text-muted-foreground">Edit your information</p>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <Shield className="h-6 w-6 mb-2 text-primary" />
                <h4 className="font-medium">Security Settings</h4>
                <p className="text-sm text-muted-foreground">Manage your security</p>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <Calendar className="h-6 w-6 mb-2 text-primary" />
                <h4 className="font-medium">View Activity</h4>
                <p className="text-sm text-muted-foreground">Check recent actions</p>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <Key className="h-6 w-6 mb-2 text-primary" />
                <h4 className="font-medium">API Keys</h4>
                <p className="text-sm text-muted-foreground">Manage integrations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}