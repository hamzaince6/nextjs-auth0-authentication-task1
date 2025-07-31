export interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  roles?: string[];
  permissions?: string[];
}

export interface Session {
  user: User;
  accessToken?: string;
  refreshToken?: string;
  expires: string;
}

export interface AuthError {
  error: string;
  error_description?: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: AuthError | null;
}

export interface RolePermissions {
  admin: string[];
  user: string[];
}

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export interface AuthConfig {
  domain: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  audience?: string;
}