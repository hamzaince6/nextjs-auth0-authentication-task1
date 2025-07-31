'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Lock, Zap, ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  // Simple state for demo purposes
  const isLoggedIn = false; // This would normally come from auth context

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Secure Authentication
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground/80 mt-4">
            with Auth0 + NextAuth.js
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Production-ready authentication system with JWT tokens, role-based access control, 
            and modern security practices. Built with Next.js 14 App Router.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          {isLoggedIn ? (
            <Button asChild size="lg" className="px-8">
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="px-8">
              <Link href="/login">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="text-center">
            <Shield className="h-8 w-8 mx-auto text-primary" />
            <CardTitle>Secure Auth</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Auth0 OAuth integration with industry-standard security practices
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="text-center">
            <Lock className="h-8 w-8 mx-auto text-primary" />
            <CardTitle>JWT Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Stateless authentication with secure JWT token management
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="text-center">
            <Users className="h-8 w-8 mx-auto text-primary" />
            <CardTitle>Role-Based</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Granular access control with admin and user role management
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="text-center">
            <Zap className="h-8 w-8 mx-auto text-primary" />
            <CardTitle>Production Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              SOLID principles, 12 Factor App compliance, and TypeScript
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Status Section */}
      <section className="bg-muted/30 rounded-lg p-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h3 className="text-2xl font-semibold">System Status</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-center gap-2 p-4 bg-background rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Auth0 Connected</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 p-4 bg-background rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>NextAuth Ready</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 p-4 bg-background rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Middleware Active</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 p-4 bg-background rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>JWT Validation</span>
            </div>
          </div>

          {isLoggedIn && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary">
                ✅ You are currently signed in as: <strong>demo@example.com</strong>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Roles: user
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="text-center py-12 space-y-6">
          <h3 className="text-2xl font-semibold">Ready to get started?</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sign in to explore the dashboard and see role-based access control in action.
          </p>
          <Button asChild size="lg" className="px-12">
            <Link href="/login">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      )}
    </div>
  );
}