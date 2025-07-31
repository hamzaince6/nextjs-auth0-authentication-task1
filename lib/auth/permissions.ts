import { UserRole, USER_ROLES } from "@/types/auth";

// Define permissions for each role
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    'users:read',
    'users:write', 
    'users:delete',
    'admin:access',
    'reports:read',
    'settings:write'
  ],
  [USER_ROLES.USER]: [
    'profile:read',
    'profile:write',
    'dashboard:access'
  ]
} as const;

/**
 * Check if user has specific permission
 */
export function hasPermission(userRoles: string[], permission: string): boolean {
  return userRoles.some(role => {
    const rolePermissions = ROLE_PERMISSIONS[role as UserRole];
    return rolePermissions?.includes(permission as any);
  });
}

/**
 * Check if user has specific role
 */
export function hasRole(userRoles: string[], requiredRole: UserRole): boolean {
  return userRoles.includes(requiredRole);
}

/**
 * Check if user is admin
 */
export function isAdmin(userRoles: string[]): boolean {
  return hasRole(userRoles, USER_ROLES.ADMIN);
}

/**
 * Get all permissions for user roles
 */
export function getUserPermissions(userRoles: string[]): string[] {
  const permissions = new Set<string>();
  
  userRoles.forEach(role => {
    const rolePermissions = ROLE_PERMISSIONS[role as UserRole];
    rolePermissions?.forEach(permission => permissions.add(permission));
  });
  
  return Array.from(permissions);
}

/**
 * Check multiple permissions
 */
export function hasAnyPermission(userRoles: string[], permissions: string[]): boolean {
  return permissions.some(permission => hasPermission(userRoles, permission));
}

/**
 * Check all permissions
 */
export function hasAllPermissions(userRoles: string[], permissions: string[]): boolean {
  return permissions.every(permission => hasPermission(userRoles, permission));
}