# 📚 Complete API Documentation
## Online Tailoring Management System

**Version:** 1.0.0  
**Base URL:** `http://localhost:4000`  
**Environment:** Development

---

## 📋 Table of Contents

1. [Authentication](#1-authentication) - 7 endpoints
2. [Measurements](#2-measurements) - 5 endpoints
3. [Orders](#3-orders) - 4 endpoints
4. [Invoices](#4-invoices) - 1 endpoint
5. [Payments](#5-payments) - 2 endpoints
6. [Notifications](#6-notifications) - 2 endpoints

**Total Endpoints:** 21

---

## 🔐 Authentication

All authenticated endpoints require an `Authorization` header with a Bearer token:
```
Authorization: Bearer <your_access_token>
```

### Access Token Expiry
- **Access Token:** 24 hours
- **Refresh Token:** 7 days

---

## 1. 👤 Authentication

### 1.1 Register User
**POST** `/api/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "+94771234567",
  "role": "customer"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1...",
      "refreshToken": "eyJhbGciOiJIUzI1..."
    }
  }
}
```

---

### 1.2 Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1...",
      "refreshToken": "eyJhbGciOiJIUzI1..."
    }
  }
}
```

---

### 1.3-1.7 Other Auth Endpoints
- **POST** `/api/auth/refresh` - Refresh access token
- **GET** `/api/auth/me` - Get current user (Auth required)
- **PUT** `/api/auth/profile` - Update profile (Auth required)
- **PUT** `/api/auth/change-password` - Change password (Auth required)
- **POST** `/api/auth/logout` - Logout (Auth required)

*See AUTH_API_DOCUMENTATION.md for detailed documentation*

---

## 2. 📏 Measurements

### 2.1 Get All Measurements
**GET** `/api/measurements`

**Role-Based Access:**
- **Customer:** Returns only their own measurements
- **Admin:** Returns all measurements OR filtered by `user_id`

**Query Parameters:**
- `user_id` (Admin only): Filter by customer ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": {
    "measurements": [
      {
        "id": 1,
        "user_id": 1,
        "chest": 38.5,
        "waist": 32.0,
        "hips": 40.0,
        "sleeve": 25.0,
        "shoulder": 17.5,
        "neck": 15.0,
        "length": 42.0,
        "unit": "inch",
        "notes": "Regular fit",
        "created_at": "2025-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

### 2.2-2.5 Other Measurement Endpoints
- **POST** `/api/measurements` - Create measurement (Admin: any user, Customer: own)
- **GET** `/api/measurements/:id` - Get measurement by ID
- **PUT** `/api/measurements/:id` - Update measurement
- **DELETE** `/api/measurements/:id` - Delete measurement (Admin only)

*See MEASUREMENTS_API_DOCUMENTATION.md for detailed documentation*

---

## 3. 📦 Orders

### 3.1 Create Order
**POST** `/api/orders`

**Access:** Admin only

Creates a new tailoring order for a customer. Automatically captures the customer's latest measurements as a snapshot.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "user_id": 1,
  "items": [
    {
      "item_name": "Formal Shirt",
      "quantity": 2,
      "price": 50.00,
      "description": "White formal shirt with full sleeves"
    },
    {
      "item_name": "Trouser",
      "quantity": 1,
      "price": 75.00,
      "description": "Black formal trouser"
    }
  ],
  "subtotal": 175.00,
  "tax": 17.50,
  "discount": 10.00,
  "total": 182.50,
  "status": "pending"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "order": {
      "id": 1,
      "user_id": 1,
      "created_by": 2,
      "status": "pending",
      "items_json": [...],
      "measurement_snapshot": {
        "chest": 38.5,
        "waist": 32.0,
        "hips": 40.0,
        "sleeve": 25.0,
        "shoulder": 17.5,
        "neck": 15.0,
        "length": 42.0,
        "unit": "inch"
      },
      "subtotal": 175.00,
      "tax": 17.50,
      "discount": 10.00,
      "total": 182.50,
      "created_at": "2025-01-15T14:30:00Z",
      "updated_at": "2025-01-15T14:30:00Z"
    }
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "No measurements found for this customer. Please add measurements first."
}
```

---

### 3.2 Get All Orders
**GET** `/api/orders`

**Role-Based Access:**
- **Customer:** Returns only their own orders
- **Admin:** Returns all orders OR filtered

**Query Parameters:**
- `customer_id` (Admin only): Filter by customer ID
- `status`: Filter by order status (pending, in_progress, ready, delivered)
- `limit`: Max results (default: 50)
- `offset`: Skip results (default: 0)

**Example Request:**
```bash
# Customer - get own orders
curl -H "Authorization: Bearer <customer_token>" \
  http://localhost:4000/api/orders

# Admin - get all orders
curl -H "Authorization: Bearer <admin_token>" \
  http://localhost:4000/api/orders

# Admin - filter by customer
curl -H "Authorization: Bearer <admin_token>" \
  "http://localhost:4000/api/orders?customer_id=1"

# Filter by status
curl -H "Authorization: Bearer <token>" \
  "http://localhost:4000/api/orders?status=pending"
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": {
    "orders": [
      {
        "id": 1,
        "user_id": 1,
        "status": "pending",
        "subtotal": 175.00,
        "tax": 17.50,
        "discount": 10.00,
        "total": 182.50,
        "created_at": "2025-01-15T14:30:00Z"
      }
    ]
  }
}
```

---

### 3.3 Get Single Order
**GET** `/api/orders/:id`

**Access:** 
- **Customer:** Can only view their own orders
- **Admin:** Can view any order

**Example Request:**
```bash
curl -H "Authorization: Bearer <token>" \
  http://localhost:4000/api/orders/1
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "order": {
      "id": 1,
      "user_id": 1,
      "created_by": 2,
      "status": "pending",
      "items_json": [
        {
          "item_name": "Formal Shirt",
          "quantity": 2,
          "price": 50.00,
          "description": "White formal shirt"
        }
      ],
      "measurement_snapshot": {...},
      "subtotal": 175.00,
      "tax": 17.50,
      "discount": 10.00,
      "total": 182.50,
      "created_at": "2025-01-15T14:30:00Z",
      "updated_at": "2025-01-15T14:30:00Z"
    }
  }
}
```

**Error (403):**
```json
{
  "success": false,
  "message": "You can only access your own orders"
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Order not found"
}
```

---

### 3.4 Update Order Status
**PATCH** `/api/orders/:id/status`

**Access:** Admin only

Updates the status of an order. Status flow: `pending` → `in_progress` → `ready` → `delivered`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "in_progress"
}
```

**Valid Status Values:**
- `pending` - Order created, payment pending
- `in_progress` - Payment received, work started
- `ready` - Order completed, ready for pickup
- `delivered` - Order delivered to customer
- `cancelled` - Order cancelled

**Example Request:**
```bash
curl -X PATCH http://localhost:4000/api/orders/1/status \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"status": "in_progress"}'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Order status updated to in_progress",
  "data": {
    "order": {
      "id": 1,
      "user_id": 1,
      "status": "in_progress",
      "subtotal": 175.00,
      "tax": 17.50,
      "total": 182.50,
      "updated_at": "2025-01-15T15:45:00Z"
    }
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Invalid status. Must be one of: pending, in_progress, ready, delivered, cancelled"
}
```

---

## 4. 🧾 Invoices

### 4.1 Get/Generate Invoice
**GET** `/api/invoices/:orderId`

**Access:**
- **Customer:** Can only view invoices for their own orders
- **Admin:** Can view any invoice

Fetches an existing invoice or generates a new one if it doesn't exist.

**Example Request:**
```bash
curl -H "Authorization: Bearer <token>" \
  http://localhost:4000/api/invoices/1
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "invoice": {
      "id": 1,
      "order_id": 1,
      "invoice_no": "INV-2025-001",
      "items_snapshot": [
        {
          "item_name": "Formal Shirt",
          "quantity": 2,
          "price": 50.00
        }
      ],
      "subtotal": 175.00,
      "tax": 17.50,
      "total": 182.50,
      "paid": false,
      "payment_transaction_id": null,
      "created_at": "2025-01-15T15:00:00Z"
    }
  }
}
```

**Invoice Number Format:**
- Pattern: `INV-YYYY-XXX`
- Example: `INV-2025-001`, `INV-2025-002`
- Auto-increments within each year

**Error (404):**
```json
{
  "success": false,
  "message": "Order not found"
}
```

**Error (403):**
```json
{
  "success": false,
  "message": "You can only access invoices for your own orders"
}
```

---

## 5. 💳 Payments

### 5.1 Create Checkout Session
**POST** `/api/payments/create-checkout`

**Access:** Authenticated users (Customer/Admin)

Creates a payment checkout session with a payment provider (Stripe, PayHere, etc.)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "order_id": 1,
  "provider": "stripe"
}
```

**Valid Providers:**
- `stripe` - Stripe Checkout (Credit/Debit cards)
- `payhere` - PayHere (Sri Lankan payment gateway)
- `cash` - Cash payment (manual)
- `bank_transfer` - Bank transfer (manual)

**Response (201):**
```json
{
  "success": true,
  "message": "Checkout session created",
  "data": {
    "transaction_id": 1,
    "provider": "stripe",
    "checkout_url": "https://checkout.stripe.com/session_abc123",
    "session_id": "cs_test_abc123"
  }
}
```

**For Manual Payment (cash/bank_transfer):**
```json
{
  "success": true,
  "message": "Checkout session created",
  "data": {
    "transaction_id": 1,
    "provider": "cash",
    "message": "Please complete cash payment and provide proof to admin"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "This order has already been paid"
}
```

**Error (403):**
```json
{
  "success": false,
  "message": "You can only create checkout for your own orders"
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Order not found"
}
```

---

### 5.2 Payment Webhook Handler
**POST** `/api/payments/webhook`

**Access:** Public (verified via signature)

Handles payment provider webhooks. This endpoint is called by payment providers (Stripe, PayHere) to notify about payment status changes.

**⚠️ Important:** This endpoint does NOT require authentication. Payment providers use webhook signatures for verification.

**Headers (Stripe):**
```
Stripe-Signature: t=1234567890,v1=abc123...
```

**Headers (PayHere):**
```
X-Payhere-Signature: abc123...
```

**Request Body (Example - Stripe):**
```json
{
  "provider_payment_id": "cs_test_abc123",
  "status": "succeeded",
  "order_id": 1,
  "amount": 182.50,
  "currency": "USD"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Webhook processed successfully"
}
```

**What Happens When Payment Succeeds:**
1. ✅ Payment transaction status updated to `completed`
2. ✅ Invoice marked as `paid`
3. ✅ Order status updated to `in_progress`
4. ✅ Admin can start working on the order

**Error (400):**
```json
{
  "success": false,
  "message": "Invalid webhook payload"
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Transaction not found"
}
```

---

## 6. 📧 Notifications

### 6.1 Send Notification
**POST** `/api/notifications/send`

**Access:** Admin only

Send email or SMS notifications to customers.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body (Email):**
```json
{
  "user_id": 1,
  "channel": "email",
  "template": "order_ready",
  "payload": {
    "email": "john@example.com",
    "order_id": 1,
    "customer_name": "John Doe",
    "message": "Your order is ready for pickup"
  }
}
```

**Request Body (SMS):**
```json
{
  "user_id": 1,
  "channel": "sms",
  "template": "order_ready",
  "payload": {
    "phone": "+94771234567",
    "order_id": 1,
    "customer_name": "John Doe",
    "message": "Your order #1 is ready for pickup"
  }
}
```

**Valid Channels:**
- `email` - Email notification
- `sms` - SMS notification

**Valid Templates:**
- `order_confirmation` - Order created notification
- `payment_received` - Payment successful notification
- `order_ready` - Order ready for pickup
- `order_delivered` - Order delivered confirmation
- `custom` - Custom message

**Response (201):**
```json
{
  "success": true,
  "message": "Notification sent",
  "data": {
    "log_id": 1,
    "status": "sent"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Invalid channel. Must be either email or sms"
}
```

---

### 6.2 Get Notification Logs
**GET** `/api/notifications/logs`

**Access:**
- **Customer:** Can only view their own notification logs
- **Admin:** Can view all logs OR filtered

**Query Parameters:**
- `user_id` (Admin only): Filter by customer ID
- `channel`: Filter by email/sms
- `status`: Filter by sent/failed/pending
- `limit`: Max results (default: 50)

**Example Request:**
```bash
# Customer - get own logs
curl -H "Authorization: Bearer <customer_token>" \
  http://localhost:4000/api/notifications/logs

# Admin - get all logs
curl -H "Authorization: Bearer <admin_token>" \
  http://localhost:4000/api/notifications/logs

# Admin - filter by user
curl -H "Authorization: Bearer <admin_token>" \
  "http://localhost:4000/api/notifications/logs?user_id=1"

# Filter by channel and status
curl -H "Authorization: Bearer <token>" \
  "http://localhost:4000/api/notifications/logs?channel=email&status=sent"
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": {
    "logs": [
      {
        "id": 1,
        "user_id": 1,
        "channel": "email",
        "template": "order_ready",
        "payload": {
          "email": "john@example.com",
          "order_id": 1,
          "message": "Your order is ready"
        },
        "status": "sent",
        "error": null,
        "created_at": "2025-01-15T16:00:00Z"
      },
      {
        "id": 2,
        "user_id": 1,
        "channel": "sms",
        "template": "payment_received",
        "payload": {
          "phone": "+94771234567",
          "message": "Payment received"
        },
        "status": "sent",
        "error": null,
        "created_at": "2025-01-15T15:30:00Z"
      }
    ]
  }
}
```

---

## 🔑 Error Codes

### HTTP Status Codes
- **200** - Success
- **201** - Created
- **400** - Bad Request (validation error)
- **401** - Unauthorized (no token or invalid token)
- **403** - Forbidden (no permission)
- **404** - Not Found
- **500** - Internal Server Error

### Common Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## 🛡️ Security Best Practices

### 1. Authentication
- Always include `Authorization: Bearer <token>` header
- Store tokens securely (localStorage for web, Keychain for mobile)
- Refresh tokens before expiry

### 2. HTTPS
- In production, use HTTPS only
- Never send tokens over HTTP

### 3. Rate Limiting
- Implement rate limiting on frontend
- Max 100 requests per minute recommended

### 4. Validation
- All inputs are validated on backend
- Frontend should also validate before sending

---

## 📝 Testing with Postman

### 1. Import Environment Variables
Create a Postman environment with:
```json
{
  "base_url": "http://localhost:4000",
  "access_token": "",
  "refresh_token": "",
  "user_id": ""
}
```

### 2. Save Tokens After Login
In Login request, add to Tests tab:
```javascript
const response = pm.response.json();
if (response.success) {
  pm.environment.set("access_token", response.data.tokens.accessToken);
  pm.environment.set("refresh_token", response.data.tokens.refreshToken);
  pm.environment.set("user_id", response.data.user.id);
}
```

### 3. Use Token in Authorization
For all authenticated requests:
- Type: Bearer Token
- Token: `{{access_token}}`

---

## 🚀 API Workflow Examples

### Example 1: Complete Order Flow

```
1. Customer registers/logs in
   POST /api/auth/login
   → Save access_token

2. Admin adds customer measurements
   POST /api/measurements
   Body: { user_id: 1, chest: 38.5, ... }

3. Admin creates order
   POST /api/orders
   Body: { user_id: 1, items: [...], total: 182.50 }
   → Returns order with measurement snapshot

4. Customer views invoice
   GET /api/invoices/1
   → Invoice auto-generated with number INV-2025-001

5. Customer creates checkout
   POST /api/payments/create-checkout
   Body: { order_id: 1, provider: "stripe" }
   → Returns checkout URL

6. Payment provider sends webhook
   POST /api/payments/webhook
   → Invoice marked as paid
   → Order status → in_progress

7. Admin updates order status
   PATCH /api/orders/1/status
   Body: { status: "ready" }

8. Admin sends notification
   POST /api/notifications/send
   Body: { user_id: 1, channel: "email", template: "order_ready" }

9. Customer views notification history
   GET /api/notifications/logs
```

---

## 📊 Database Schema Reference

### Users Table
- Stores customer and admin accounts
- Passwords are hashed with bcrypt

### Measurements Table
- Stores body measurements
- Linked to users
- JSON field for flexible data

### Orders Table
- Stores tailoring orders
- Contains `items_json` (order details)
- Contains `measurement_snapshot` (historical accuracy)
- Status tracking

### Invoices Table
- Auto-generated invoice numbers
- Linked to orders
- Payment tracking

### Payment Transactions Table
- Multiple payment providers supported
- Webhook payload stored for debugging
- Transaction status tracking

### Notification Logs Table
- Email/SMS notification history
- Template-based system
- Error tracking

---

## 🐞 Troubleshooting

### 401 Unauthorized
**Problem:** API returns 401
**Solution:**
- Check if token is included in Authorization header
- Token format: `Bearer <token>`
- Check if token is expired (use refresh endpoint)

### 403 Forbidden
**Problem:** API returns 403
**Solution:**
- You don't have permission for this action
- Customer trying to access admin-only endpoint
- Customer trying to access another user's data

### 404 Not Found
**Problem:** API returns 404
**Solution:**
- Check if route exists
- Check if resource ID is correct
- Resource may have been deleted

### 500 Internal Server Error
**Problem:** API returns 500
**Solution:**
- Check server logs
- Database connection issue
- Backend bug (report to developer)

---

## 📞 Support

For technical support or bug reports:
- Check server logs for detailed error messages
- Verify database connection
- Ensure all environment variables are set correctly

---

**Last Updated:** January 2025  
**API Version:** 1.0.0
