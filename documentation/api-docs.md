# API Documentation

## 🔗 Authentication API Endpoints

### NextAuth.js Endpoints

#### GET/POST `/api/auth/signin`
**Description:** NextAuth.js default signin page  
**Usage:** Automatically handled by NextAuth.js

#### GET/POST `/api/auth/callback/:provider`
**Description:** OAuth callback endpoint  
**Parameters:**
- `provider`: OAuth provider name (auth0)

#### GET `/api/auth/signout`
**Description:** Sign out endpoint  
**Usage:** Automatically handled by NextAuth.js

#### GET `/api/auth/session`
**Description:** Get current session information  
**Response:**
```json
{
  "user": {
    "id": "auth0|60f1234567890abc",
    "name": "John Doe",
    "email": "john@example.com",
    "picture": "https://avatar.url",
    "roles": ["user"]
  },
  "expires": "2024-02-01T00:00:00.000Z"
}
```

#### GET `/api/auth/csrf`
**Description:** Get CSRF token  
**Response:**
```json
{
  "csrfToken": "abc123def456"
}
```

#### GET `/api/auth/providers`
**Description:** Get available auth providers  
**Response:**
```json
{
  "auth0": {
    "id": "auth0",
    "name": "Auth0",
    "type": "oauth",
    "signinUrl": "/api/auth/signin/auth0"
  }
}
```

## 🛠 Custom API Endpoints (Future)

### User Management

#### GET `/api/users/profile`
**Description:** Get current user profile  
**Authentication:** Required  
**Response:**
```json
{
  "id": "auth0|60f1234567890abc",
  "name": "John Doe",
  "email": "john@example.com",
  "roles": ["user"],
  "permissions": ["profile:read", "profile:write"],
  "lastLogin": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT `/api/users/profile`
**Description:** Update user profile  
**Authentication:** Required  
**Permission:** `profile:write`  
**Request Body:**
```json
{
  "name": "John Updated",
  "preferences": {
    "theme": "dark",
    "language": "en"
  }
}
```

### Admin API

#### GET `/api/admin/users`
**Description:** Get all users (Admin only)  
**Authentication:** Required  
**Role:** Admin  
**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term

**Response:**
```json
{
  "users": [
    {
      "id": "auth0|60f1234567890abc",
      "name": "John Doe",
      "email": "john@example.com",
      "roles": ["user"],
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### POST `/api/admin/users/:id/roles`
**Description:** Assign role to user  
**Authentication:** Required  
**Role:** Admin  
**Request Body:**
```json
{
  "roles": ["admin", "user"]
}
```

## 🔒 Authentication Headers

### Required Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
X-CSRF-Token: <csrf_token>
```

### Example Request
```bash
curl -X GET \
  http://localhost:3000/api/users/profile \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Content-Type: application/json'
```

## ⚡ Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "details": "You must be signed in to access this resource"
  }
}
```

### Error Codes
- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (400): Invalid request data
- `INTERNAL_ERROR` (500): Server error

## 🛡 Security Considerations

### Rate Limiting
- Authentication endpoints: 5 requests per minute
- User endpoints: 60 requests per minute
- Admin endpoints: 30 requests per minute

### CORS Configuration
```javascript
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
};
```

## 📝 Client-Side Usage Examples

### React Hook Usage
```typescript
import { useSession } from 'next-auth/react';

function ProfileComponent() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;
  
  return <div>Hello {session.user.name}</div>;
}
```

### API Call with Authentication
```typescript
import { getSession } from 'next-auth/react';

async function makeAuthenticatedRequest() {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Not authenticated');
  }
  
  const response = await fetch('/api/users/profile', {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.json();
}
```

### Role-Based Component
```typescript
import { useSession } from 'next-auth/react';
import { hasRole } from '@/lib/auth/permissions';

function AdminOnlyComponent() {
  const { data: session } = useSession();
  const userRoles = session?.user?.roles || [];
  
  if (!hasRole(userRoles, 'admin')) {
    return <div>Access denied</div>;
  }
  
  return <div>Admin content</div>;
}
```

## 🔄 Webhook Integration (Future)

### Auth0 Webhooks
Configure webhooks in Auth0 Dashboard for real-time events:

#### User Registration
```json
{
  "event": "user_created",
  "user": {
    "user_id": "auth0|60f1234567890abc",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Role Assignment
```json
{
  "event": "role_assigned",
  "user_id": "auth0|60f1234567890abc",
  "roles": ["admin"],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```