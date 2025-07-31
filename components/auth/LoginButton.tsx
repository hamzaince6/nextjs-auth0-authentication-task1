'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Loader2 } from "lucide-react";

interface LoginButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function LoginButton({ variant = 'default', size = 'default', className }: LoginButtonProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Button variant={variant} size={size} disabled className={className}>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (session) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={() => signOut({ callbackUrl: '/' })}
        className={className}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => signIn('auth0')}
      className={className}
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  );
}