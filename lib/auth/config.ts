// Simple auth configuration without NextAuth dependencies
export interface AuthConfig {
  providers: string[];
  sessionStrategy: 'jwt' | 'database';
  maxAge: number;
}

export const authConfig: AuthConfig = {
  providers: ['auth0', 'google', 'github'],
  sessionStrategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 days
};

// Simple validation function
export function validateAuthConfig() {
  // For demo purposes, always return true
  // In a real app, you would check for required environment variables here
  return true;
}

// Mock auth functions for demo
export function getAuthConfig() {
  return authConfig;
}

export function isAuthEnabled() {
  return process.env.NODE_ENV === 'production' || process.env.ENABLE_AUTH === 'true';
}