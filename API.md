# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format

All responses follow this format:

**Success:**
```json
{
  "message": "Success message",
  "data": { ... }
}
```

**Error:**
```json
{
  "message": "Error message",
  "error": "Error details (in development mode)"
}
```

## Endpoints

### Health Check

#### GET /health
Check if API is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Tailoring Management System API is running"
}
```

---

## Authentication Endpoints

### POST /auth/register
Register a new user.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

### POST /auth/login
Login user.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### GET /auth/profile
Get user profile (Protected).

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "role": "customer",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT /auth/profile
Update user profile (Protected).

**Body:**
```json
{
  "name": "John Updated",
  "phone": "0987654321",
  "address": "456 New St"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully"
}
```

---

## Measurement Endpoints

### POST /measurements
Create a new measurement (Protected).

**Body:**
```json
{
  "measurement_type": "shirt",
  "chest": 40.5,
  "waist": 34,
  "hip": 38,
  "shoulder": 18,
  "sleeve_length": 24,
  "shirt_length": 30,
  "pant_length": 42,
  "inseam": 32,
  "neck": 15.5,
  "additional_notes": "Prefer slim fit",
  "photo_url": "https://example.com/photo.jpg"
}
```

**Response (201):**
```json
{
  "message": "Measurement created successfully",
  "measurementId": 1
}
```

### GET /measurements
Get all measurements (Protected).

**Query Parameters:**
- `userId` (admin only) - Filter by user ID

**Response (200):**
```json
{
  "measurements": [
    {
      "id": 1,
      "user_id": 1,
      "measurement_type": "shirt",
      "chest": 40.5,
      "waist": 34,
      "hip": 38,
      "shoulder": 18,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /measurements/:id
Get measurement by ID (Protected).

**Response (200):**
```json
{
  "measurement": {
    "id": 1,
    "user_id": 1,
    "measurement_type": "shirt",
    "chest": 40.5,
    "waist": 34,
    "hip": 38,
    "shoulder": 18,
    "sleeve_length": 24,
    "shirt_length": 30,
    "pant_length": 42,
    "inseam": 32,
    "neck": 15.5,
    "additional_notes": "Prefer slim fit",
    "ai_generated": false,
    "photo_url": "https://example.com/photo.jpg",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT /measurements/:id
Update measurement (Protected).

**Body:**
```json
{
  "measurement_type": "shirt",
  "chest": 41,
  "waist": 34.5,
  "additional_notes": "Updated measurements"
}
```

**Response (200):**
```json
{
  "message": "Measurement updated successfully"
}
```

### DELETE /measurements/:id
Delete measurement (Protected).

**Response (200):**
```json
{
  "message": "Measurement deleted successfully"
}
```

### POST /measurements/estimate
AI measurement estimation (Protected, Coming Soon).

**Response (501):**
```json
{
  "message": "AI measurement estimation feature coming soon",
  "description": "This feature will use AI to estimate body measurements from photos"
}
```

---

## Order Endpoints

### POST /orders
Create a new order (Protected).

**Body:**
```json
{
  "measurement_id": 1,
  "order_type": "shirt",
  "fabric_type": "Cotton",
  "color": "Blue",
  "design_preference": "Slim fit with button-down collar",
  "quantity": 2,
  "delivery_date": "2024-02-01"
}
```

**Response (201):**
```json
{
  "message": "Order created successfully",
  "orderId": 1
}
```

### GET /orders
Get all orders (Protected).

**Response (200):**
```json
{
  "orders": [
    {
      "id": 1,
      "user_id": 1,
      "customer_name": "John Doe",
      "customer_email": "john@example.com",
      "measurement_id": 1,
      "order_type": "shirt",
      "fabric_type": "Cotton",
      "color": "Blue",
      "design_preference": "Slim fit with button-down collar",
      "quantity": 2,
      "status": "pending",
      "delivery_date": "2024-02-01",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /orders/:id
Get order by ID (Protected).

**Response (200):**
```json
{
  "order": {
    "id": 1,
    "user_id": 1,
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "measurement_id": 1,
    "order_type": "shirt",
    "fabric_type": "Cotton",
    "color": "Blue",
    "chest": 40.5,
    "waist": 34,
    "hip": 38,
    "shoulder": 18,
    "sleeve_length": 24,
    "status": "pending",
    "delivery_date": "2024-02-01",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT /orders/:id
Update order (Protected).

**Body:**
```json
{
  "order_type": "shirt",
  "fabric_type": "Silk",
  "color": "White",
  "design_preference": "Regular fit",
  "quantity": 1,
  "delivery_date": "2024-02-15"
}
```

**Response (200):**
```json
{
  "message": "Order updated successfully"
}
```

### PATCH /orders/:id/status
Update order status (Admin Only).

**Body:**
```json
{
  "status": "in_progress"
}
```

**Status Options:** `pending`, `in_progress`, `completed`, `cancelled`

**Response (200):**
```json
{
  "message": "Order status updated successfully"
}
```

### DELETE /orders/:id
Delete order (Protected).

**Response (200):**
```json
{
  "message": "Order deleted successfully"
}
```

---

## Bill Endpoints

### POST /bills
Create a bill (Admin Only).

**Body:**
```json
{
  "order_id": 1,
  "amount": 150.00,
  "tax": 15.00
}
```

**Response (201):**
```json
{
  "message": "Bill created successfully",
  "billId": 1
}
```

### GET /bills
Get all bills (Protected).

**Response (200):**
```json
{
  "bills": [
    {
      "id": 1,
      "order_id": 1,
      "user_id": 1,
      "customer_name": "John Doe",
      "customer_email": "john@example.com",
      "order_type": "shirt",
      "amount": 150.00,
      "tax": 15.00,
      "total_amount": 165.00,
      "payment_status": "pending",
      "payment_method": null,
      "transaction_id": null,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /bills/:id
Get bill by ID (Protected).

**Response (200):**
```json
{
  "bill": {
    "id": 1,
    "order_id": 1,
    "user_id": 1,
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "order_type": "shirt",
    "fabric_type": "Cotton",
    "color": "Blue",
    "amount": 150.00,
    "tax": 15.00,
    "total_amount": 165.00,
    "payment_status": "pending",
    "payment_method": null,
    "transaction_id": null,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT /bills/:id
Update bill (Admin Only).

**Body:**
```json
{
  "amount": 160.00,
  "tax": 16.00,
  "payment_status": "paid"
}
```

**Response (200):**
```json
{
  "message": "Bill updated successfully"
}
```

### DELETE /bills/:id
Delete bill (Admin Only).

**Response (200):**
```json
{
  "message": "Bill deleted successfully"
}
```

---

## Payment Endpoints

### POST /payments/intent
Create payment intent (Protected).

**Body:**
```json
{
  "billId": 1
}
```

**Response (200):**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "amount": 165.00
}
```

### POST /payments/process
Process payment (Protected).

**Body:**
```json
{
  "billId": 1,
  "paymentIntentId": "pi_xxx"
}
```

**Response (200):**
```json
{
  "message": "Payment processed successfully",
  "transactionId": "pi_xxx"
}
```

### GET /payments/history
Get payment history (Protected).

**Response (200):**
```json
{
  "transactions": [
    {
      "id": 1,
      "bill_id": 1,
      "order_id": 1,
      "order_type": "shirt",
      "stripe_payment_id": "pi_xxx",
      "amount": 165.00,
      "currency": "USD",
      "status": "succeeded",
      "payment_date": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Notification Endpoints

### GET /notifications
Get all notifications (Protected).

**Response (200):**
```json
{
  "notifications": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Order Placed",
      "message": "Your order #1 has been placed successfully.",
      "type": "success",
      "is_read": false,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### PATCH /notifications/:id/read
Mark notification as read (Protected).

**Response (200):**
```json
{
  "message": "Notification marked as read"
}
```

### DELETE /notifications/:id
Delete notification (Protected).

**Response (200):**
```json
{
  "message": "Notification deleted successfully"
}
```

### POST /notifications/alert
Send alert to all customers (Admin Only).

**Body:**
```json
{
  "title": "System Maintenance",
  "message": "The system will be under maintenance on Sunday.",
  "type": "warning"
}
```

**Response (200):**
```json
{
  "message": "Alert sent successfully",
  "recipientCount": 25
}
```

### POST /notifications/send
Send notification to specific user (Admin Only).

**Body:**
```json
{
  "userId": 1,
  "title": "Custom Message",
  "message": "Your order is ready for pickup!",
  "type": "info"
}
```

**Response (200):**
```json
{
  "message": "Notification sent successfully"
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |
| 501 | Not Implemented |

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting in production.

## Webhooks

Future feature: Stripe webhooks for payment confirmations.
