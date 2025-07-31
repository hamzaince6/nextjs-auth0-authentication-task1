'use client';

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { hasRole, hasPermission } from "@/lib/auth/permissions";
import { UserRole } from "@/types/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldX } from "lucide-react";

interface RoleGuardProps {
  children: ReactNode;
  roles?: UserRole[];
  permissions?: string[];
  fallback?: ReactNode;
  requireAll?: boolean; // true = all roles/permissions required, false = any
}

export function RoleGuard({ 
  children, 
  roles = [], 
  permissions = [],
  fallback,
  requireAll = false 
}: RoleGuardProps) {
  const { data: session, status } = useSession();

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // No session
  if (!session?.user) {
    return fallback || (
      <Alert className="m-4">
        <ShieldX className="h-4 w-4" />
        <AlertDescription>
          You need to be signed in to access this content.
        </AlertDescription>
      </Alert>
    );
  }

  const userRoles = session.user.roles || [];

  // Check roles
  if (roles.length > 0) {
    const roleCheck = requireAll 
      ? roles.every(role => hasRole(userRoles, role))
      : roles.some(role => hasRole(userRoles, role));
    
    if (!roleCheck) {
      return fallback || (
        <Alert className="m-4">
          <ShieldX className="h-4 w-4" />
          <AlertDescription>
            You don't have the required role to access this content.
            Required: {roles.join(', ')}
          </AlertDescription>
        </Alert>
      );
    }
  }

  // Check permissions
  if (permissions.length > 0) {
    const permissionCheck = requireAll
      ? permissions.every(permission => hasPermission(userRoles, permission))
      : permissions.some(permission => hasPermission(userRoles, permission));
    
    if (!permissionCheck) {
      return fallback || (
        <Alert className="m-4">
          <ShieldX className="h-4 w-4" />
          <AlertDescription>
            You don't have the required permissions to access this content.
          </AlertDescription>
        </Alert>
      );
    }
  }

  return <>{children}</>;
}