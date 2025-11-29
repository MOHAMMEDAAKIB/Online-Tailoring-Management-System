# 🧪 Postman Testing Guide
## Orders, Invoices, Payments & Notifications APIs

This guide will walk you through testing all the newly implemented APIs using Postman.

---

## 📋 Prerequisites

1. **Server Running:** Make sure your backend is running on `http://localhost:4000`
2. **Postman Installed:** Download from [postman.com](https://www.postman.com/downloads/)
3. **Tokens Ready:** You need an admin token and a customer token

---

## 🔐 Step 1: Get Tokens

### 1.1 Login as Admin
```
POST http://localhost:4000/api/auth/login

Body (JSON):
{
  "email": "admin@example.com",
  "password": "Admin123"
}

Save: access_token as {{admin_token}}
```

### 1.2 Login as Customer
```
POST http://localhost:4000/api/auth/login

Body (JSON):
{
  "email": "customer@example.com",
  "password": "Customer123"
}

Save: access_token as {{customer_token}}
Save: user.id as {{customer_id}}
```

---

## 📦 Step 2: Test Orders API

### 2.1 Create Order (Admin Only)

**⚠️ Important:** Customer must have measurements first!

```
POST http://localhost:4000/api/orders
Authorization: Bearer {{admin_token}}

Body (JSON):
{
  "user_id": {{customer_id}},
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

Expected Response (201):
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
      "measurement_snapshot": {...},
      "subtotal": 175.00,
      "tax": 17.50,
      "discount": 10.00,
      "total": 182.50,
      "created_at": "2025-01-15T14:30:00Z"
    }
  }
}

💾 Save: order.id as {{order_id}}
```

**Error Handling:**
- If "No measurements found", add measurements first:
  ```
  POST http://localhost:4000/api/measurements
  Authorization: Bearer {{admin_token}}
  
  Body:
  {
    "user_id": {{customer_id}},
    "chest": 38.5,
    "waist": 32.0,
    "hips": 40.0,
    "sleeve": 25.0,
    "shoulder": 17.5,
    "neck": 15.0,
    "length": 42.0,
    "unit": "inch"
  }
  ```

---

### 2.2 Get All Orders (Customer View)
```
GET http://localhost:4000/api/orders
Authorization: Bearer {{customer_token}}

Expected Response (200):
{
  "success": true,
  "count": 1,
  "data": {
    "orders": [
      {
        "id": 1,
        "user_id": 1,
        "status": "pending",
        "subtotal": 175.00,
        "total": 182.50,
        "created_at": "2025-01-15T14:30:00Z"
      }
    ]
  }
}

✅ Customer sees only their own orders
```

---

### 2.3 Get All Orders (Admin View)
```
GET http://localhost:4000/api/orders
Authorization: Bearer {{admin_token}}

Expected Response (200):
{
  "success": true,
  "count": 3,
  "data": {
    "orders": [...]
  }
}

✅ Admin sees ALL orders
```

---

### 2.4 Get All Orders with Filters
```
# Filter by customer
GET http://localhost:4000/api/orders?customer_id={{customer_id}}
Authorization: Bearer {{admin_token}}

# Filter by status
GET http://localhost:4000/api/orders?status=pending
Authorization: Bearer {{admin_token}}

# Filter by both
GET http://localhost:4000/api/orders?customer_id=1&status=pending
Authorization: Bearer {{admin_token}}

# Pagination
GET http://localhost:4000/api/orders?limit=10&offset=0
Authorization: Bearer {{admin_token}}
```

---

### 2.5 Get Single Order
```
GET http://localhost:4000/api/orders/{{order_id}}
Authorization: Bearer {{customer_token}}

Expected Response (200):
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
      "total": 182.50
    }
  }
}
```

**Test Ownership Check:**
```
# Try accessing another customer's order with customer token
GET http://localhost:4000/api/orders/999
Authorization: Bearer {{customer_token}}

Expected Response (403):
{
  "success": false,
  "message": "You can only access your own orders"
}

✅ Ownership protection working!
```

---

### 2.6 Update Order Status (Admin Only)
```
PATCH http://localhost:4000/api/orders/{{order_id}}/status
Authorization: Bearer {{admin_token}}

Body (JSON):
{
  "status": "in_progress"
}

Expected Response (200):
{
  "success": true,
  "message": "Order status updated to in_progress",
  "data": {
    "order": {
      "id": 1,
      "status": "in_progress",
      "updated_at": "2025-01-15T15:45:00Z"
    }
  }
}
```

**Test Status Flow:**
```
1. PATCH /api/orders/1/status → { "status": "pending" }
2. PATCH /api/orders/1/status → { "status": "in_progress" }
3. PATCH /api/orders/1/status → { "status": "ready" }
4. PATCH /api/orders/1/status → { "status": "delivered" }

✅ Status progression complete!
```

**Test Invalid Status:**
```
PATCH http://localhost:4000/api/orders/{{order_id}}/status
Authorization: Bearer {{admin_token}}

Body:
{
  "status": "invalid_status"
}

Expected Response (400):
{
  "success": false,
  "message": "Status must be one of: pending, in_progress, ready, delivered, cancelled"
}
```

---

## 🧾 Step 3: Test Invoices API

### 3.1 Get/Generate Invoice
```
GET http://localhost:4000/api/invoices/{{order_id}}
Authorization: Bearer {{customer_token}}

Expected Response (200):
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

💾 Save: invoice.id as {{invoice_id}}
💾 Save: invoice.invoice_no as {{invoice_no}}

✅ If invoice doesn't exist, it's auto-generated!
✅ Invoice number format: INV-2025-001
```

---

### 3.2 Get Same Invoice Again
```
GET http://localhost:4000/api/invoices/{{order_id}}
Authorization: Bearer {{customer_token}}

Expected Response (200):
{
  "success": true,
  "data": {
    "invoice": {
      "id": 1,
      "invoice_no": "INV-2025-001",
      ...
    }
  }
}

✅ Returns existing invoice (not creating duplicate)
```

---

### 3.3 Test Ownership Check
```
# Try accessing invoice for another customer's order
GET http://localhost:4000/api/invoices/999
Authorization: Bearer {{customer_token}}

Expected Response (403):
{
  "success": false,
  "message": "You can only access invoices for your own orders"
}

✅ Ownership protection working!
```

---

## 💳 Step 4: Test Payments API

### 4.1 Create Checkout Session (Stripe)
```
POST http://localhost:4000/api/payments/create-checkout
Authorization: Bearer {{customer_token}}

Body (JSON):
{
  "order_id": {{order_id}},
  "provider": "stripe"
}

Expected Response (201):
{
  "success": true,
  "message": "Checkout session created",
  "data": {
    "transaction_id": 1,
    "provider": "stripe",
    "checkout_url": "https://checkout.stripe.com/mock-session-1",
    "session_id": "cs_test_mock_1234567890"
  }
}

💾 Save: transaction_id as {{transaction_id}}
💾 Save: session_id as {{session_id}}

✅ In production, customer would be redirected to checkout_url
```

---

### 4.2 Create Checkout (PayHere)
```
POST http://localhost:4000/api/payments/create-checkout
Authorization: Bearer {{customer_token}}

Body:
{
  "order_id": {{order_id}},
  "provider": "payhere"
}

Expected Response (201):
{
  "success": true,
  "message": "Checkout session created",
  "data": {
    "transaction_id": 2,
    "provider": "payhere",
    "checkout_url": "https://www.payhere.lk/pay/mock-1",
    "merchant_id": "mock_merchant"
  }
}
```

---

### 4.3 Create Checkout (Cash Payment)
```
POST http://localhost:4000/api/payments/create-checkout
Authorization: Bearer {{customer_token}}

Body:
{
  "order_id": {{order_id}},
  "provider": "cash"
}

Expected Response (201):
{
  "success": true,
  "message": "Checkout session created",
  "data": {
    "transaction_id": 3,
    "provider": "cash",
    "message": "Please complete cash payment and provide proof to admin"
  }
}

✅ Manual payment method
```

---

### 4.4 Test Duplicate Payment Prevention
```
# Try creating checkout for already paid order
POST http://localhost:4000/api/payments/create-checkout
Authorization: Bearer {{customer_token}}

Body:
{
  "order_id": {{order_id}},
  "provider": "stripe"
}

Expected Response (400):
{
  "success": false,
  "message": "This order has already been paid"
}

✅ Prevents duplicate payments
```

---

### 4.5 Simulate Payment Webhook (Success)
```
POST http://localhost:4000/api/payments/webhook
⚠️ NO Authorization header (webhooks come from external providers)

Body (JSON):
{
  "provider_payment_id": "{{session_id}}",
  "status": "succeeded",
  "order_id": {{order_id}},
  "amount": 182.50,
  "currency": "USD"
}

Expected Response (200):
{
  "success": true,
  "message": "Webhook processed successfully"
}

✅ What happens behind the scenes:
1. Payment transaction status → "completed"
2. Invoice marked as "paid"
3. Order status → "in_progress"
```

---

### 4.6 Verify Payment Updated Invoice
```
GET http://localhost:4000/api/invoices/{{order_id}}
Authorization: Bearer {{customer_token}}

Expected Response (200):
{
  "success": true,
  "data": {
    "invoice": {
      "id": 1,
      "invoice_no": "INV-2025-001",
      "paid": true,  ← Changed to true!
      "payment_transaction_id": 1,  ← Linked to payment!
      ...
    }
  }
}

✅ Invoice automatically marked as paid!
```

---

### 4.7 Verify Payment Updated Order Status
```
GET http://localhost:4000/api/orders/{{order_id}}
Authorization: Bearer {{customer_token}}

Expected Response (200):
{
  "success": true,
  "data": {
    "order": {
      "id": 1,
      "status": "in_progress",  ← Changed from "pending"!
      ...
    }
  }
}

✅ Order status automatically updated!
```

---

### 4.8 Simulate Payment Webhook (Failed)
```
POST http://localhost:4000/api/payments/webhook

Body:
{
  "provider_payment_id": "cs_test_failed_123",
  "status": "failed",
  "order_id": {{order_id}}
}

Expected Response (200):
{
  "success": true,
  "message": "Webhook processed successfully"
}

✅ Transaction marked as "failed"
✅ Invoice stays unpaid
✅ Order stays in current status
```

---

## 📧 Step 5: Test Notifications API

### 5.1 Send Email Notification (Admin Only)
```
POST http://localhost:4000/api/notifications/send
Authorization: Bearer {{admin_token}}

Body (JSON):
{
  "user_id": {{customer_id}},
  "channel": "email",
  "template": "order_ready",
  "payload": {
    "email": "customer@example.com",
    "order_id": {{order_id}},
    "customer_name": "John Doe",
    "message": "Your order is ready for pickup!"
  }
}

Expected Response (201):
{
  "success": true,
  "message": "Notification sent",
  "data": {
    "log_id": 1,
    "status": "sent"
  }
}

💾 Save: log_id as {{notification_log_id}}

✅ In production, actual email would be sent via SendGrid/Nodemailer
```

---

### 5.2 Send SMS Notification
```
POST http://localhost:4000/api/notifications/send
Authorization: Bearer {{admin_token}}

Body:
{
  "user_id": {{customer_id}},
  "channel": "sms",
  "template": "payment_received",
  "payload": {
    "phone": "+94771234567",
    "order_id": {{order_id}},
    "customer_name": "John Doe",
    "message": "Payment of $182.50 received. Thank you!"
  }
}

Expected Response (201):
{
  "success": true,
  "message": "Notification sent",
  "data": {
    "log_id": 2,
    "status": "sent"
  }
}

✅ In production, actual SMS would be sent via Twilio
```

---

### 5.3 Test All Templates
```
# Order Confirmation
POST http://localhost:4000/api/notifications/send
Body: { ..., "template": "order_confirmation" }

# Payment Received
POST http://localhost:4000/api/notifications/send
Body: { ..., "template": "payment_received" }

# Order Ready
POST http://localhost:4000/api/notifications/send
Body: { ..., "template": "order_ready" }

# Order Delivered
POST http://localhost:4000/api/notifications/send
Body: { ..., "template": "order_delivered" }

# Custom Message
POST http://localhost:4000/api/notifications/send
Body: { ..., "template": "custom" }

✅ All templates working!
```

---

### 5.4 Get Notification Logs (Customer)
```
GET http://localhost:4000/api/notifications/logs
Authorization: Bearer {{customer_token}}

Expected Response (200):
{
  "success": true,
  "count": 2,
  "data": {
    "logs": [
      {
        "id": 1,
        "user_id": 1,
        "channel": "email",
        "template": "order_ready",
        "payload": {
          "email": "customer@example.com",
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

✅ Customer sees only their own notification logs
```

---

### 5.5 Get Notification Logs (Admin)
```
GET http://localhost:4000/api/notifications/logs
Authorization: Bearer {{admin_token}}

Expected Response (200):
{
  "success": true,
  "count": 5,
  "data": {
    "logs": [...]
  }
}

✅ Admin sees ALL notification logs
```

---

### 5.6 Filter Notification Logs
```
# Filter by user
GET http://localhost:4000/api/notifications/logs?user_id={{customer_id}}
Authorization: Bearer {{admin_token}}

# Filter by channel
GET http://localhost:4000/api/notifications/logs?channel=email
Authorization: Bearer {{admin_token}}

# Filter by status
GET http://localhost:4000/api/notifications/logs?status=sent
Authorization: Bearer {{admin_token}}

# Combine filters
GET http://localhost:4000/api/notifications/logs?user_id=1&channel=sms&status=sent
Authorization: Bearer {{admin_token}}

# Pagination
GET http://localhost:4000/api/notifications/logs?limit=10
Authorization: Bearer {{admin_token}}
```

---

## 🎯 Complete Integration Test

### Full Order Lifecycle Test:

```
1. ✅ Customer registers/logs in
   POST /api/auth/login

2. ✅ Admin adds customer measurements
   POST /api/measurements
   Body: { user_id: 1, chest: 38.5, ... }

3. ✅ Admin creates order
   POST /api/orders
   Body: { user_id: 1, items: [...], total: 182.50 }

4. ✅ Customer views their orders
   GET /api/orders
   → Should see the new order

5. ✅ Customer gets invoice
   GET /api/invoices/1
   → Invoice auto-generated: INV-2025-001

6. ✅ Customer creates checkout
   POST /api/payments/create-checkout
   Body: { order_id: 1, provider: "stripe" }

7. ✅ Simulate payment success
   POST /api/payments/webhook
   Body: { provider_payment_id: "cs_test_123", status: "succeeded" }

8. ✅ Verify invoice is paid
   GET /api/invoices/1
   → paid: true

9. ✅ Verify order status updated
   GET /api/orders/1
   → status: "in_progress"

10. ✅ Admin updates order status
    PATCH /api/orders/1/status
    Body: { status: "ready" }

11. ✅ Admin sends notification
    POST /api/notifications/send
    Body: { user_id: 1, channel: "email", template: "order_ready" }

12. ✅ Customer views notifications
    GET /api/notifications/logs
    → Should see "order_ready" notification

13. ✅ Admin marks order as delivered
    PATCH /api/orders/1/status
    Body: { status: "delivered" }

14. ✅ Admin sends delivery confirmation
    POST /api/notifications/send
    Body: { channel: "sms", template: "order_delivered" }

🎉 COMPLETE ORDER LIFECYCLE TESTED!
```

---

## 🐞 Common Testing Issues

### Issue 1: "No measurements found"
**Solution:** Add measurements first
```
POST /api/measurements
Authorization: Bearer {{admin_token}}
Body: { user_id: 1, chest: 38.5, waist: 32.0, ... }
```

### Issue 2: 401 Unauthorized
**Solution:** 
- Check if token is included
- Token format: `Bearer {{token}}`
- Token may have expired, login again

### Issue 3: 403 Forbidden
**Solution:**
- Customer trying to access admin endpoint
- Customer trying to access another user's data
- Use admin token for admin-only endpoints

### Issue 4: "Order has already been paid"
**Solution:**
- Create a new order
- Or test with a different order_id

### Issue 5: Invoice not updating after payment
**Solution:**
- Check if webhook was called
- Verify provider_payment_id matches
- Check if status is "succeeded" or "completed"

---

## 📝 Postman Collection Export

Save this as a Postman Collection for easy testing:

```json
{
  "info": {
    "name": "Online Tailoring Management System",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Orders",
      "item": [
        { "name": "Create Order", "request": { "method": "POST", "url": "{{base_url}}/api/orders" } },
        { "name": "Get All Orders", "request": { "method": "GET", "url": "{{base_url}}/api/orders" } },
        { "name": "Get Order by ID", "request": { "method": "GET", "url": "{{base_url}}/api/orders/{{order_id}}" } },
        { "name": "Update Order Status", "request": { "method": "PATCH", "url": "{{base_url}}/api/orders/{{order_id}}/status" } }
      ]
    },
    {
      "name": "Invoices",
      "item": [
        { "name": "Get/Generate Invoice", "request": { "method": "GET", "url": "{{base_url}}/api/invoices/{{order_id}}" } }
      ]
    },
    {
      "name": "Payments",
      "item": [
        { "name": "Create Checkout", "request": { "method": "POST", "url": "{{base_url}}/api/payments/create-checkout" } },
        { "name": "Payment Webhook", "request": { "method": "POST", "url": "{{base_url}}/api/payments/webhook" } }
      ]
    },
    {
      "name": "Notifications",
      "item": [
        { "name": "Send Notification", "request": { "method": "POST", "url": "{{base_url}}/api/notifications/send" } },
        { "name": "Get Notification Logs", "request": { "method": "GET", "url": "{{base_url}}/api/notifications/logs" } }
      ]
    }
  ]
}
```

---

## ✅ Checklist

Before marking APIs as complete, verify:

### Orders API
- [ ] Create order (admin only)
- [ ] Get all orders (role-based filtering)
- [ ] Get single order (ownership check)
- [ ] Update order status (admin only)
- [ ] Measurement snapshot captured
- [ ] Status flow works (pending → in_progress → ready → delivered)

### Invoices API
- [ ] Get/generate invoice
- [ ] Invoice auto-generated if not exists
- [ ] Invoice number format correct (INV-2025-XXX)
- [ ] Ownership check working

### Payments API
- [ ] Create checkout (all providers: stripe, payhere, cash, bank_transfer)
- [ ] Webhook processing works
- [ ] Invoice marked as paid after successful payment
- [ ] Order status updated after payment
- [ ] Duplicate payment prevention working

### Notifications API
- [ ] Send email notification
- [ ] Send SMS notification
- [ ] All templates working
- [ ] Get notification logs (role-based)
- [ ] Filter logs by user/channel/status
- [ ] Admin only can send notifications

---

**Happy Testing! 🚀**
