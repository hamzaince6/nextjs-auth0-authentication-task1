/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
