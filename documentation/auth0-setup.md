# Auth0 Setup Rehberi

## 🔑 Auth0 Dashboard Kurulumu

### Adım 1: Auth0 Dashboard'a Giriş
1. https://auth0.com adresine gidin
2. Kullanıcı bilgilerinizle giriş yapın:
   - **Email:** hamzaince001@gmail.com
   - **Password:** ikW8P9Sc!256a@T

### Adım 2: Application Oluşturma
1. Sol menüden **"Applications"** sekmesine tıklayın
2. **"Create Application"** butonuna tıklayın
3. Application bilgilerini doldurun:
   - **Name:** "Next.js Auth App"
   - **Type:** "Regular Web Applications" seçin
4. **"Create"** butonuna tıklayın

### Adım 3: Application Settings
Application oluşturulduktan sonra **"Settings"** tabına gidin:

#### Basic Information
- **Domain:** Otomatik oluşturulan domain'i not alın (örn: `your-tenant.auth0.com`)
- **Client ID:** Bu değeri kopyalayın
- **Client Secret:** Bu değeri kopyalayın (Show butonuna tıklayın)

#### Application URIs
Aşağıdaki URL'leri ekleyin:

**Allowed Callback URLs:**
```
http://localhost:3000/api/auth/callback/auth0,
https://your-production-domain.com/api/auth/callback/auth0
```

**Allowed Logout URLs:**
```
http://localhost:3000,
https://your-production-domain.com
```

**Allowed Web Origins:**
```
http://localhost:3000,
https://your-production-domain.com
```

### Adım 4: Advanced Settings
**"Advanced Settings"** bölümünde:

#### Grant Types
Şu grant type'ları aktif edin:
- ✅ Authorization Code
- ✅ Refresh Token
- ✅ Client Credentials

#### Endpoints
**"Endpoints"** tabında aşağıdaki URL'leri not alın:
- **OAuth Authorization URL**
- **OAuth Token URL**
- **OAuth User Info URL**

### Adım 5: APIs (Optional - JWT için)
1. Sol menüden **"APIs"** sekmesine gidin
2. **"Create API"** butonuna tıklayın
3. API bilgilerini doldurun:
   - **Name:** "Next.js API"
   - **Identifier:** `https://your-domain.com/api` (unique olmalı)
   - **Signing Algorithm:** RS256

### Adım 6: User Management
#### Roles Oluşturma (Bonus Feature)
1. **"User Management"** > **"Roles"** sekmesine gidin
2. İki rol oluşturun:
   - **Role Name:** `admin`
     - **Description:** "Admin kullanıcıları için"
   - **Role Name:** `user`
     - **Description:** "Normal kullanıcılar için"

#### Test Kullanıcısı Oluşturma
1. **"User Management"** > **"Users"** sekmesine gidin
2. **"Create User"** butonuna tıklayın
3. Test kullanıcısı bilgilerini doldurun
4. Oluşturulan kullanıcıya rol atayın

## 🔧 Environment Variables
Auth0 dashboard'dan aldığınız bilgileri `.env.local` dosyasına ekleyin:

```env
# Auth0 Configuration
AUTH0_SECRET='uzun-random-string-buraya-gelecek'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-tenant.auth0.com'
AUTH0_CLIENT_ID='your-client-id-buraya'
AUTH0_CLIENT_SECRET='your-client-secret-buraya'

# NextAuth Configuration  
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='nextauth-secret-key-buraya'
```

## 🔐 Secret Key Oluşturma
Terminal'de aşağıdaki komutu çalıştırarak güvenli secret key oluşturun:

```bash
# Auth0 Secret için
openssl rand -hex 32

# NextAuth Secret için
openssl rand -hex 32
```

## ✅ Doğrulama Checklist
- [ ] Auth0 Application oluşturuldu
- [ ] Callback URLs eklendi
- [ ] Client ID ve Secret alındı
- [ ] Environment variables ayarlandı
- [ ] Roles oluşturuldu (bonus)
- [ ] Test kullanıcısı oluşturuldu

## 🚨 Güvenlik Notları
1. **Client Secret'ı asla public repository'de paylaşmayın**
2. **Production'da HTTPS kullanın**
3. **Secret keyleri düzenli olarak yenileyin**
4. **Minimum gerekli izinleri verin**

## 🆘 Sorun Giderme
### Yaygın Hatalar:
1. **"Callback URL mismatch"** - Callback URL'leri kontrol edin
2. **"Invalid client"** - Client ID/Secret kontrolü yapın
3. **"CORS error"** - Web Origins ayarlarını kontrol edin

### Debug İpuçları:
- Auth0 Dashboard > Monitoring > Logs bölümünden hataları takip edin
- Browser Developer Tools > Network tabından HTTP isteklerini inceleyin
- NextAuth debug modunu aktif edin (NEXTAUTH_DEBUG=true)