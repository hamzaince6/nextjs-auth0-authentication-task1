# Test Rehberi

## 🧪 Test Senaryoları

### 1. Authentication Tests

#### Login Flow Test
```bash
1. Ana sayfaya git (http://localhost:3000)
2. "Sign In" butonuna tıkla
3. Auth0 login sayfasına yönlendirildiğini kontrol et
4. Doğru kullanıcı bilgileriyle giriş yap
5. Dashboard'a yönlendirildiğini kontrol et
6. Kullanıcı bilgilerinin doğru gösterildiğini kontrol et
```

#### Logout Flow Test
```bash
1. Dashboard sayfasında oturum açık durumda ol
2. Navbar'dan kullanıcı menüsüne tıkla
3. "Sign Out" butonuna tıkla
4. Ana sayfaya yönlendirildiğini kontrol et
5. Navbar'da "Sign In" butonunun göründüğünü kontrol et
```

### 2. Authorization Tests

#### Protected Route Test
```bash
1. Oturum kapalı durumda /dashboard URL'ine git
2. Login sayfasına yönlendirildiğini kontrol et
3. Giriş yap
4. Dashboard sayfasına erişilebildiğini kontrol et
```

#### Admin Route Test
```bash
1. Normal user rolü ile /admin URL'ine git
2. Dashboard'a yönlendirildiğini kontrol et (erişim reddedildi)
3. Admin rolü ile giriş yap
4. /admin sayfasına erişilebildiğini kontrol et
```

### 3. Role-Based Access Tests

#### User Role Test
```bash
1. User rolüne sahip hesapla giriş yap
2. Dashboard erişimini kontrol et: ✅ Erişilebilir
3. Admin panel erişimini kontrol et: ❌ Erişim reddedilmeli
4. Navbar'da admin linkinin görünmediğini kontrol et
```

#### Admin Role Test
```bash
1. Admin rolüne sahip hesapla giriş yap
2. Dashboard erişimini kontrol et: ✅ Erişilebilir
3. Admin panel erişimini kontrol et: ✅ Erişilebilir
4. Navbar'da admin linkinin göründüğünü kontrol et
```

### 4. JWT Token Tests

#### Token Validation Test
```bash
1. Browser Developer Tools > Application > Cookies'i aç
2. next-auth.session-token cookie'sinin var olduğunu kontrol et
3. jwt.io'da token'ı decode et
4. User bilgilerinin doğru olduğunu kontrol et
```

#### Token Expiration Test
```bash
1. Token süresini kısa ayarla (test için)
2. Giriş yap ve bekle
3. Token'ın otomatik yenilendiğini kontrol et
4. Oturumun devam ettiğini kontrol et
```

### 5. Error Handling Tests

#### Invalid Credentials Test
```bash
1. Yanlış bilgilerle giriş yapmaya çalış
2. Hata mesajının gösterildiğini kontrol et
3. Login sayfasında kaldığını kontrol et
```

#### Network Error Test
```bash
1. İnternet bağlantısını kes
2. Giriş yapmaya çalış
3. Uygun hata mesajının gösterildiğini kontrol et
```

## 🔧 Manual Test Checklist

### ✅ Authentication
- [ ] Login with Auth0 works
- [ ] Logout works correctly
- [ ] Session persistence after page refresh
- [ ] Callback URL handling
- [ ] Error page displays correctly

### ✅ Authorization
- [ ] Protected routes redirect to login
- [ ] Authorized users can access protected routes
- [ ] Unauthorized users cannot access admin routes
- [ ] Role-based navigation menu

### ✅ UI/UX
- [ ] Responsive design on mobile
- [ ] Loading states display correctly
- [ ] Error messages are user-friendly
- [ ] Navigation works smoothly
- [ ] Profile information displays correctly

### ✅ Security
- [ ] JWT tokens are secure (HttpOnly)
- [ ] No sensitive data in localStorage
- [ ] CSRF protection active
- [ ] Secure cookie settings

## 🚀 Automated Testing (Future)

### Unit Tests
```typescript
// Example test structure
describe('Auth Utils', () => {
  test('hasPermission should return true for valid permission', () => {
    // Test implementation
  });
  
  test('isAdmin should return true for admin role', () => {
    // Test implementation
  });
});
```

### Integration Tests
```typescript
// Example integration test
describe('Authentication Flow', () => {
  test('should redirect to dashboard after successful login', () => {
    // Test implementation
  });
});
```

### E2E Tests (Playwright/Cypress)
```javascript
// Example E2E test
describe('Full Authentication Flow', () => {
  it('should complete login flow', () => {
    cy.visit('/');
    cy.contains('Sign In').click();
    // Continue with full flow
  });
});
```

## 🐛 Known Issues & Solutions

### Issue: Callback URL Mismatch
**Solution:** Auth0 Dashboard > Applications > Settings > Allowed Callback URLs'i kontrol et

### Issue: JWT Decode Error  
**Solution:** NextAuth secret key'in doğru ayarlandığından emin ol

### Issue: Role Not Showing
**Solution:** Auth0'da custom claims ayarlarını kontrol et

## 📊 Performance Testing

### Load Testing
- Concurrent user login stress test
- Token validation performance
- Database query optimization

### Security Testing
- JWT token validation security
- CSRF attack prevention
- XSS protection verification