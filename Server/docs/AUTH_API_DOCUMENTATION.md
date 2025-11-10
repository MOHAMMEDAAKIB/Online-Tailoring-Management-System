# Authentication API Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [API Endpoints](#api-endpoints)
  - [Register User](#1-register-user)
  - [Login](#2-login)
  - [Refresh Token](#3-refresh-token)
  - [Get Current User](#4-get-current-user)
  - [Update Profile](#5-update-profile)
  - [Change Password](#6-change-password)
  - [Logout](#7-logout)

---

## 🌐 Overview

The Authentication API provides secure user registration, login, and profile management functionality for the Online Tailoring Management System. It uses JWT (JSON Web Tokens) for authentication.

### Key Features
- ✅ User Registration (Customer & Admin roles)
- ✅ Secure Login with JWT tokens
- ✅ Token refresh mechanism
- ✅ Profile management
- ✅ Password change functionality
- ✅ Role-based access control

---

## 🔗 Base URL

```
http://localhost:4000/api/auth
```

**Production:** Replace with your production domain
```
https://your-domain.com/api/auth
```

---

## 🔐 Authentication

Most endpoints require authentication using JWT tokens. Include the access token in the request header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Lifecycle
- **Access Token:** Valid for 24 hours (used for API requests)
- **Refresh Token:** Valid for 7 days (used to get new access token)

---

## ❌ Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### Common HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not found |
| 500 | Server error |

---

## 📌 API Endpoints

---

## 1. Register User

Create a new user account (customer or admin).

### Endpoint
```
POST /api/auth/register
```

### Access Level
🌍 **Public** (No authentication required)

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "+94771234567",
  "role": "customer"
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | ✅ Yes | User's full name (2-100 characters, letters only) |
| email | string | ✅ Yes | Valid email address |
| password | string | ✅ Yes | Minimum 8 characters, must contain letter and number |
| phone | string | ❌ No | Valid phone number format |
| role | string | ❌ No | Either "customer" or "admin" (default: "customer") |

### Success Response (201 Created)
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+94771234567",
      "role": "customer"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### Error Responses

**400 Bad Request** - Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters long"
    }
  ]
}
```

**409 Conflict** - Email Already Exists
```json
{
  "success": false,
  "message": "Email already registered"
}
```

### Example with cURL
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "phone": "+94771234567",
    "role": "customer"
  }'
```

### Example with JavaScript (Fetch)
```javascript
const response = await fetch('http://localhost:4000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePass123',
    phone: '+94771234567',
    role: 'customer'
  })
});

const data = await response.json();
console.log(data);
```

---

## 2. Login

Authenticate user and receive JWT tokens.

### Endpoint
```
POST /api/auth/login
```

### Access Level
🌍 **Public** (No authentication required)

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | ✅ Yes | User's email address |
| password | string | ✅ Yes | User's password |

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+94771234567",
      "role": "customer"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### Error Responses

**401 Unauthorized** - Invalid Credentials
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Example with cURL
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Example with JavaScript (Fetch)
```javascript
const response = await fetch('http://localhost:4000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123'
  })
});

const data = await response.json();

// Store tokens in localStorage
localStorage.setItem('accessToken', data.data.tokens.accessToken);
localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
```

---

## 3. Refresh Token

Get a new access token when the current one expires.

### Endpoint
```
POST /api/auth/refresh
```

### Access Level
🌍 **Public** (But requires valid refresh token)

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| refreshToken | string | ✅ Yes | Valid refresh token from login/register |

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Error Responses

**401 Unauthorized** - Invalid/Expired Token
```json
{
  "success": false,
  "message": "Invalid or expired refresh token"
}
```

### Example with JavaScript (Fetch)
```javascript
const refreshToken = localStorage.getItem('refreshToken');

const response = await fetch('http://localhost:4000/api/auth/refresh', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    refreshToken: refreshToken
  })
});

const data = await response.json();

// Update access token
localStorage.setItem('accessToken', data.data.accessToken);
```

---

## 4. Get Current User

Retrieve the authenticated user's profile.

### Endpoint
```
GET /api/auth/me
```

### Access Level
🔒 **Private** (Authentication required)

### Request Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Request Body
None

### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+94771234567",
      "role": "customer",
      "created_at": "2025-11-10T10:30:00.000Z"
    }
  }
}
```

### Error Responses

**401 Unauthorized** - Missing/Invalid Token
```json
{
  "success": false,
  "message": "No token provided"
}
```

### Example with cURL
```bash
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

### Example with JavaScript (Fetch)
```javascript
const accessToken = localStorage.getItem('accessToken');

const response = await fetch('http://localhost:4000/api/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const data = await response.json();
console.log(data.data.user);
```

---

## 5. Update Profile

Update the authenticated user's name and phone number.

### Endpoint
```
PUT /api/auth/profile
```

### Access Level
🔒 **Private** (Authentication required)

### Request Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### Request Body
```json
{
  "name": "John Updated",
  "phone": "+94779876543"
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | ❌ No | Updated name (2-100 characters) |
| phone | string | ❌ No | Updated phone number |

**Note:** At least one field must be provided.

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Updated",
      "email": "john@example.com",
      "phone": "+94779876543",
      "role": "customer",
      "created_at": "2025-11-10T10:30:00.000Z"
    }
  }
}
```

### Error Responses

**400 Bad Request** - No Updates Provided
```json
{
  "success": false,
  "message": "No updates provided"
}
```

**401 Unauthorized** - Missing/Invalid Token
```json
{
  "success": false,
  "message": "No token provided"
}
```

### Example with JavaScript (Fetch)
```javascript
const accessToken = localStorage.getItem('accessToken');

const response = await fetch('http://localhost:4000/api/auth/profile', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Updated',
    phone: '+94779876543'
  })
});

const data = await response.json();
console.log(data);
```

---

## 6. Change Password

Change the authenticated user's password.

### Endpoint
```
PUT /api/auth/change-password
```

### Access Level
🔒 **Private** (Authentication required)

### Request Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### Request Body
```json
{
  "currentPassword": "OldPass123",
  "newPassword": "NewSecurePass456",
  "confirmPassword": "NewSecurePass456"
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| currentPassword | string | ✅ Yes | User's current password |
| newPassword | string | ✅ Yes | New password (min 8 chars, letter + number) |
| confirmPassword | string | ✅ Yes | Must match newPassword |

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Error Responses

**401 Unauthorized** - Wrong Current Password
```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

**400 Bad Request** - Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "confirmPassword",
      "message": "Passwords do not match"
    }
  ]
}
```

### Example with JavaScript (Fetch)
```javascript
const accessToken = localStorage.getItem('accessToken');

const response = await fetch('http://localhost:4000/api/auth/change-password', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    currentPassword: 'OldPass123',
    newPassword: 'NewSecurePass456',
    confirmPassword: 'NewSecurePass456'
  })
});

const data = await response.json();
console.log(data);
```

---

## 7. Logout

Logout the authenticated user.

### Endpoint
```
POST /api/auth/logout
```

### Access Level
🔒 **Private** (Authentication required)

### Request Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Request Body
None

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Example with JavaScript (Fetch)
```javascript
const accessToken = localStorage.getItem('accessToken');

const response = await fetch('http://localhost:4000/api/auth/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const data = await response.json();

// Clear tokens from storage
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');

// Redirect to login page
window.location.href = '/login';
```

---

## 🔧 Testing with Postman

### Step 1: Import Environment
Create a new environment with these variables:
```
base_url = http://localhost:4000
access_token = (leave empty, will be set automatically)
refresh_token = (leave empty, will be set automatically)
```

### Step 2: Register a User
```
Method: POST
URL: {{base_url}}/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "TestPass123",
  "role": "customer"
}

Tests Tab (Auto-save tokens):
pm.test("Status is 201", function() {
    pm.response.to.have.status(201);
});

const response = pm.response.json();
pm.environment.set("access_token", response.data.tokens.accessToken);
pm.environment.set("refresh_token", response.data.tokens.refreshToken);
```

### Step 3: Test Protected Endpoints
```
Method: GET
URL: {{base_url}}/api/auth/me
Authorization: Bearer {{access_token}}
```

---

## 🛡️ Security Best Practices

### For Frontend Developers

1. **Store Tokens Securely**
   ```javascript
   // ✅ Good: httpOnly cookie (best)
   // ✅ Good: localStorage (acceptable for demo)
   // ❌ Bad: sessionStorage (lost on tab close)
   // ❌ Bad: URL parameters (visible in logs)
   ```

2. **Always Use HTTPS in Production**
   ```javascript
   const API_URL = process.env.NODE_ENV === 'production' 
     ? 'https://api.yourdomain.com'
     : 'http://localhost:4000';
   ```

3. **Handle Token Expiry**
   ```javascript
   // Automatic token refresh on 401 error
   async function fetchWithAuth(url, options = {}) {
     const token = localStorage.getItem('accessToken');
     
     let response = await fetch(url, {
       ...options,
       headers: {
         ...options.headers,
         'Authorization': `Bearer ${token}`
       }
     });
     
     // If token expired, refresh and retry
     if (response.status === 401) {
       const refreshToken = localStorage.getItem('refreshToken');
       const refreshResponse = await fetch('/api/auth/refresh', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ refreshToken })
       });
       
       const data = await refreshResponse.json();
       localStorage.setItem('accessToken', data.data.accessToken);
       
       // Retry original request
       response = await fetch(url, {
         ...options,
         headers: {
           ...options.headers,
           'Authorization': `Bearer ${data.data.accessToken}`
         }
       });
     }
     
     return response;
   }
   ```

4. **Never Log Sensitive Data**
   ```javascript
   // ❌ Bad
   console.log('Token:', token);
   
   // ✅ Good
   console.log('User authenticated:', !!token);
   ```

---

## 📝 Notes

- **Email cannot be changed** after registration (security measure)
- **Access tokens expire after 24 hours** - use refresh token to get new one
- **Refresh tokens expire after 7 days** - user must login again
- **Passwords are hashed** using bcrypt (not stored in plain text)
- **Role-based access** can be extended for future features

---

## 📞 Support

For issues or questions:
- **Email:** support@tailoring-system.com
- **Repository:** [GitHub Link]
- **Documentation:** [Wiki Link]

---

**Last Updated:** November 10, 2025  
**API Version:** 1.0.0
