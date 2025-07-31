# Environment Configuration

## Auth0 Credentials

Aşağıdaki Auth0 bilgilerini kullanarak `.env.local` dosyasını oluşturun:

### Auth0 Bilgileri
- **Client ID:** `y8iYEAslMJWnYs3AmL17zQRdRF9jU4cp`
- **Client Secret:** `ytUjOQyv8GzWtcGUtJIjdhSqta_UVCH7vU76PGjr3gibwFf1EpNZy7cLWAuYlJ0j`
- **Domain:** `dev-nr2y12abwbp4qdwf.us.auth0.com`

## .env.local Dosyası

Task-1 dizininde `.env.local` dosyası oluşturun ve aşağıdaki içeriği ekleyin:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Auth0 Configuration
AUTH0_SECRET=your-auth0-secret-here
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://dev-nr2y12abwbp4qdwf.us.auth0.com
AUTH0_CLIENT_ID=y8iYEAslMJWnYs3AmL17zQRdRF9jU4cp
AUTH0_CLIENT_SECRET=ytUjOQyv8GzWtcGUtJIjdhSqta_UVCH7vU76PGjr3gibwFf1EpNZy7cLWAuYlJ0j

# Development Configuration
NODE_ENV=development
ENABLE_AUTH=true
```

## Secret Key Oluşturma

Terminal'de aşağıdaki komutları çalıştırarak güvenli secret key'ler oluşturun:

```bash
# Auth0 Secret için
openssl rand -hex 32

# NextAuth Secret için
openssl rand -hex 32
```

Oluşturulan secret key'leri `AUTH0_SECRET` ve `NEXTAUTH_SECRET` değişkenlerine yerleştirin.

## Auth0 Dashboard Ayarları

Auth0 dashboard'da aşağıdaki URL'leri eklemeyi unutmayın:

### Allowed Callback URLs:
```
http://localhost:3000/api/auth/callback/auth0
```

### Allowed Logout URLs:
```
http://localhost:3000
```

### Allowed Web Origins:
```
http://localhost:3000
```

## Uygulamayı Çalıştırma

Environment dosyasını oluşturduktan sonra:

```bash
cd Task-1
npm install
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır. 