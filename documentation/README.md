# Auth0 + NextAuth.js Authentication System

## 🎯 Proje Özeti
Auth0 üzerinden OAuth entegrasyonu, JWT tabanlı oturum kontrolü ve Next.js middleware ile sayfa erişimi kısıtlanan, SOLID prensiplerine uygun kimlik doğrulama sistemi.

## 🛠 Teknolojiler
- **Next.js 14** (App Router)
- **Auth0** (OAuth Provider)
- **NextAuth.js** (Authentication)
- **JWT** (JSON Web Token)
- **TypeScript** (Type Safety)
- **TailwindCSS** (Styling)

## 📋 Özellikler
- ✅ Auth0 OAuth entegrasyonu
- ✅ JWT tabanlı oturum yönetimi
- ✅ Middleware ile sayfa koruması
- ✅ Rol bazlı yetkilendirme (admin/user)
- ✅ 12 Factor App uyumlu yapılandırma
- ✅ TypeScript tip güvenliği
- ✅ Responsive UI tasarımı

## 🚀 Kurulum ve Çalıştırma

### 1. Proje Kurulumu
```bash
npm install
npm run dev
```

### 2. Environment Variables
`.env.local` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# Auth0 Configuration
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
```

### 3. Auth0 Setup Rehberi
Detaylı kurulum için `documentation/auth0-setup.md` dosyasına bakın.

## 📁 Proje Yapısı
```
├── app/
│   ├── api/auth/[...nextauth]/
│   ├── dashboard/
│   ├── admin/
│   └── login/
├── components/
│   ├── auth/
│   ├── ui/
│   └── layout/
├── lib/
│   ├── auth/
│   ├── middleware/
│   └── utils/
├── middleware.ts
├── documentation/
└── types/
```

## 🔐 Güvenlik Özellikleri
- JWT token doğrulama
- Role-based access control
- Secure cookie management
- CSRF protection
- XSS protection

## 📖 Daha Fazla Bilgi
- [Auth0 Setup Guide](./auth0-setup.md)
- [Architecture Documentation](./architecture.md)
- [API Documentation](./api-docs.md)
- [Testing Guide](./testing.md)