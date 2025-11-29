# Measurements API Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Access Control](#access-control)
- [Error Handling](#error-handling)
- [API Endpoints](#api-endpoints)
  - [Get All Measurements](#1-get-all-measurements)
  - [Create Measurement](#2-create-measurement)
  - [Get Measurement by ID](#3-get-measurement-by-id)
  - [Update Measurement](#4-update-measurement)
  - [Delete Measurement](#5-delete-measurement)

---

## 🌐 Overview

The Measurements API provides functionality to manage customer body measurements for tailoring services. Measurements include chest, waist, hips, sleeve, shoulder, neck, and length dimensions.

### Key Features
- ✅ Create and store customer measurements
- ✅ Support for multiple units (cm, inch, m)
- ✅ Role-based access control
- ✅ Measurement history tracking
- ✅ Customer-specific data isolation

---

## 🔗 Base URL

```
http://localhost:4000/api/measurements
```

**Production:** Replace with your production domain
```
https://your-domain.com/api/measurements
```

---

## 🔐 Authentication

**All measurement endpoints require authentication.** Include the access token in the request header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### How to Get Token
1. Register or login via `/api/auth/register` or `/api/auth/login`
2. Use the `accessToken` from the response
3. Include it in the Authorization header for all measurement requests

---

## 🛡️ Access Control

Measurements API implements role-based access control:

### Customer Role
- ✅ Can view **only their own** measurements
- ✅ Can create measurements **for themselves only**
- ✅ Can update **only their own** measurements
- ✅ Can delete **only their own** measurements
- ❌ Cannot view other customers' measurements

### Admin Role
- ✅ Can view **all measurements** from all customers
- ✅ Can create measurements **for any customer**
- ✅ Can update **any measurement**
- ✅ Can delete **any measurement**
- ✅ Can filter measurements by customer ID

---

## ❌ Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (access denied - not your resource) |
| 404 | Not found |
| 500 | Server error |

---

## 📌 API Endpoints

---

## 1. Get All Measurements

Retrieve measurements based on user role and permissions.

### Endpoint
```
GET /api/measurements
```

### Access Level
🔒 **Private** (Authentication required)

### Request Headers
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| customer_id | integer | ❌ No | (Admin only) Filter measurements for specific customer |

### Request Examples

**Customer Request:**
```
GET /api/measurements
Authorization: Bearer eyJhbGci...
```

**Admin Request (All):**
```
GET /api/measurements
Authorization: Bearer eyJhbGci...
```

**Admin Request (Filter):**
```
GET /api/measurements?customer_id=5
Authorization: Bearer eyJhbGci...
```

### Success Response (200 OK)

**Customer View:**
```json
{
  "success": true,
  "count": 2,
  "data": {
    "measurements": [
      {
        "id": 1,
        "user_id": 5,
        "chest": 38.5,
        "waist": 32,
        "hips": 40,
        "sleeve": 24,
        "shoulder": 16,
        "neck": 15,
        "length": 42,
        "unit": "inch",
        "notes": "Standard fit",
        "created_at": "2025-11-12T10:30:00.000Z"
      },
      {
        "id": 2,
        "user_id": 5,
        "chest": 39,
        "waist": 33,
        "hips": 41,
        "sleeve": 24.5,
        "shoulder": 16.5,
        "neck": 15.5,
        "length": 43,
        "unit": "inch",
        "notes": "Updated measurements",
        "created_at": "2025-11-12T11:00:00.000Z"
      }
    ]
  }
}
```

**Admin View:**
```json
{
  "success": true,
  "count": 5,
  "data": {
    "measurements": [
      {
        "id": 1,
        "user_id": 5,
        "chest": 38.5,
        ...
      },
      {
        "id": 3,
        "user_id": 7,
        "chest": 40,
        ...
      }
    ]
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
# Customer view
curl -X GET http://localhost:4000/api/measurements \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Admin view (filter by customer)
curl -X GET "http://localhost:4000/api/measurements?customer_id=5" \
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN"
```

### Example with JavaScript (Fetch)
```javascript
const accessToken = localStorage.getItem('accessToken');

const response = await fetch('http://localhost:4000/api/measurements', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const data = await response.json();
console.log(`Found ${data.count} measurements`);
data.data.measurements.forEach(m => {
  console.log(`Measurement ${m.id}: Chest ${m.chest}${m.unit}`);
});
```

---

## 2. Create Measurement

Create a new measurement record.

### Endpoint
```
POST /api/measurements
```

### Access Level
🔒 **Private** (Authentication required)

### Request Headers
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| user_id | integer | ❌ No | (Admin only) Target customer ID. Customers cannot specify this. |
| chest | float | ❌ No | Chest measurement |
| waist | float | ❌ No | Waist measurement |
| hips | float | ❌ No | Hips measurement |
| sleeve | float | ❌ No | Sleeve length |
| shoulder | float | ❌ No | Shoulder width |
| neck | float | ❌ No | Neck circumference |
| length | float | ❌ No | Garment length |
| unit | string | ❌ No | Unit of measurement: "cm", "inch", or "m" (default: "cm") |
| notes | string | ❌ No | Additional notes (max 500 characters) |

**Note:** All measurement fields are optional, but at least one measurement field should be provided.

### Request Body Example

**Customer Request:**
```json
{
  "chest": 38.5,
  "waist": 32,
  "hips": 40,
  "sleeve": 24,
  "shoulder": 16,
  "neck": 15,
  "length": 42,
  "unit": "inch",
  "notes": "Standard fit, prefer loose around waist"
}
```

**Admin Request (for customer ID 5):**
```json
{
  "user_id": 5,
  "chest": 96,
  "waist": 82,
  "hips": 100,
  "sleeve": 60,
  "shoulder": 42,
  "neck": 38,
  "length": 105,
  "unit": "cm",
  "notes": "Measured for formal suit"
}
```

### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Measurement created successfully",
  "data": {
    "measurement": {
      "id": 15,
      "user_id": 5,
      "chest": 38.5,
      "waist": 32,
      "hips": 40,
      "sleeve": 24,
      "shoulder": 16,
      "neck": 15,
      "length": 42,
      "unit": "inch",
      "notes": "Standard fit, prefer loose around waist",
      "created_at": "2025-11-12T12:30:00.000Z"
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
      "field": "chest",
      "message": "Chest measurement must be a positive number"
    },
    {
      "field": "unit",
      "message": "Unit must be \"cm\", \"inch\", or \"m\""
    }
  ]
}
```

**403 Forbidden** - Customer tries to create for another user
```json
{
  "success": false,
  "message": "Customers can only create measurements for themselves"
}
```

### Example with cURL
```bash
curl -X POST http://localhost:4000/api/measurements \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "chest": 38.5,
    "waist": 32,
    "hips": 40,
    "sleeve": 24,
    "shoulder": 16,
    "neck": 15,
    "length": 42,
    "unit": "inch",
    "notes": "Standard fit"
  }'
```

### Example with JavaScript (Fetch)
```javascript
const accessToken = localStorage.getItem('accessToken');

const measurementData = {
  chest: 38.5,
  waist: 32,
  hips: 40,
  sleeve: 24,
  shoulder: 16,
  neck: 15,
  length: 42,
  unit: 'inch',
  notes: 'Standard fit, prefer loose around waist'
};

const response = await fetch('http://localhost:4000/api/measurements', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(measurementData)
});

const data = await response.json();
console.log('Measurement created with ID:', data.data.measurement.id);
```

---

## 3. Get Measurement by ID

Retrieve a specific measurement by its ID.

### Endpoint
```
GET /api/measurements/:id
```

### Access Level
🔒 **Private** (Authentication required + Ownership check)

### Request Headers
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | ✅ Yes | Measurement ID |

### Request Example
```
GET /api/measurements/15
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "measurement": {
      "id": 15,
      "user_id": 5,
      "chest": 38.5,
      "waist": 32,
      "hips": 40,
      "sleeve": 24,
      "shoulder": 16,
      "neck": 15,
      "length": 42,
      "unit": "inch",
      "notes": "Standard fit, prefer loose around waist",
      "created_at": "2025-11-12T12:30:00.000Z"
    }
  }
}
```

### Error Responses

**403 Forbidden** - Customer tries to access another customer's measurement
```json
{
  "success": false,
  "message": "You can only access your own measurements"
}
```

**404 Not Found** - Measurement doesn't exist
```json
{
  "success": false,
  "message": "Measurement not found"
}
```

### Example with cURL
```bash
curl -X GET http://localhost:4000/api/measurements/15 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Example with JavaScript (Fetch)
```javascript
const accessToken = localStorage.getItem('accessToken');
const measurementId = 15;

const response = await fetch(`http://localhost:4000/api/measurements/${measurementId}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const data = await response.json();
if (data.success) {
  const m = data.data.measurement;
  console.log(`Chest: ${m.chest}${m.unit}, Waist: ${m.waist}${m.unit}`);
}
```

---

## 4. Update Measurement

Update an existing measurement record.

### Endpoint
```
PUT /api/measurements/:id
```

### Access Level
🔒 **Private** (Authentication required + Ownership check)

### Request Headers
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | ✅ Yes | Measurement ID to update |

### Request Body

All fields are optional. Only include fields you want to update.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| chest | float | ❌ No | Updated chest measurement |
| waist | float | ❌ No | Updated waist measurement |
| hips | float | ❌ No | Updated hips measurement |
| sleeve | float | ❌ No | Updated sleeve length |
| shoulder | float | ❌ No | Updated shoulder width |
| neck | float | ❌ No | Updated neck circumference |
| length | float | ❌ No | Updated garment length |
| unit | string | ❌ No | Updated unit: "cm", "inch", or "m" |
| notes | string | ❌ No | Updated notes (max 500 characters) |

### Request Example
```
PUT /api/measurements/15
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "waist": 33,
  "notes": "Updated measurement - waist slightly larger"
}
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Measurement updated successfully",
  "data": {
    "measurement": {
      "id": 15,
      "user_id": 5,
      "chest": 38.5,
      "waist": 33,
      "hips": 40,
      "sleeve": 24,
      "shoulder": 16,
      "neck": 15,
      "length": 42,
      "unit": "inch",
      "notes": "Updated measurement - waist slightly larger",
      "created_at": "2025-11-12T12:30:00.000Z"
    }
  }
}
```

### Error Responses

**400 Bad Request** - No updates provided
```json
{
  "success": false,
  "message": "No updates provided"
}
```

**403 Forbidden** - Customer tries to update another customer's measurement
```json
{
  "success": false,
  "message": "You can only update your own measurements"
}
```

**404 Not Found** - Measurement doesn't exist
```json
{
  "success": false,
  "message": "Measurement not found"
}
```

### Example with cURL
```bash
curl -X PUT http://localhost:4000/api/measurements/15 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "waist": 33,
    "notes": "Updated measurement"
  }'
```

### Example with JavaScript (Fetch)
```javascript
const accessToken = localStorage.getItem('accessToken');
const measurementId = 15;

const updates = {
  waist: 33,
  notes: 'Updated measurement - waist slightly larger'
};

const response = await fetch(`http://localhost:4000/api/measurements/${measurementId}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updates)
});

const data = await response.json();
console.log('Measurement updated:', data.message);
```

---

## 5. Delete Measurement

Delete a measurement record permanently.

### Endpoint
```
DELETE /api/measurements/:id
```

### Access Level
🔒 **Private** (Authentication required + Ownership check)

### Request Headers
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | ✅ Yes | Measurement ID to delete |

### Request Example
```
DELETE /api/measurements/15
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Measurement deleted successfully"
}
```

### Error Responses

**403 Forbidden** - Customer tries to delete another customer's measurement
```json
{
  "success": false,
  "message": "You can only delete your own measurements"
}
```

**404 Not Found** - Measurement doesn't exist
```json
{
  "success": false,
  "message": "Measurement not found"
}
```

### Example with cURL
```bash
curl -X DELETE http://localhost:4000/api/measurements/15 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Example with JavaScript (Fetch)
```javascript
const accessToken = localStorage.getItem('accessToken');
const measurementId = 15;

const response = await fetch(`http://localhost:4000/api/measurements/${measurementId}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const data = await response.json();
if (data.success) {
  console.log('Measurement deleted successfully');
  // Remove from UI or refresh list
}
```

---

## 🔧 Testing with Postman

### Step 1: Setup Environment

Create a Postman environment with these variables:

```
base_url = http://localhost:4000
access_token = (will be set from login/register)
measurement_id = (will be set after creating measurement)
```

### Step 2: Get Access Token

Make a request to `/api/auth/login` or `/api/auth/register` and save the token:

**Tests Tab:**
```javascript
const response = pm.response.json();
pm.environment.set("access_token", response.data.tokens.accessToken);
```

### Step 3: Create a Measurement

```
POST {{base_url}}/api/measurements
Authorization: Bearer {{access_token}}

Body:
{
  "chest": 38.5,
  "waist": 32,
  "unit": "inch"
}

Tests:
const response = pm.response.json();
pm.environment.set("measurement_id", response.data.measurement.id);
```

### Step 4: Test All Endpoints

Use `{{measurement_id}}` variable in URLs for GET, PUT, DELETE operations.

---

## 🛡️ Security Best Practices

### For Frontend Developers

1. **Always Send Token**
   ```javascript
   // Include token in every measurement request
   headers: {
     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
   }
   ```

2. **Handle 403 Errors (Access Denied)**
   ```javascript
   if (response.status === 403) {
     alert('You do not have permission to access this measurement');
     // Redirect to own measurements list
   }
   ```

3. **Validate Measurements Client-Side**
   ```javascript
   // Before sending request
   if (chest <= 0 || waist <= 0) {
     alert('Measurements must be positive numbers');
     return;
   }
   ```

4. **Handle Token Expiry**
   ```javascript
   if (response.status === 401) {
     // Token expired, refresh or redirect to login
     refreshToken().then(() => retryRequest());
   }
   ```

---

## 💡 Use Cases & Examples

### Use Case 1: Customer Creates First Measurement

```javascript
// Customer registration → Login → Create measurement
async function setupNewCustomer() {
  // 1. Register
  const registerRes = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Secure123',
      role: 'customer'
    })
  });
  
  const { data } = await registerRes.json();
  const token = data.tokens.accessToken;
  
  // 2. Create measurement
  const measurementRes = await fetch('/api/measurements', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chest: 38,
      waist: 32,
      hips: 40,
      unit: 'inch'
    })
  });
  
  const measurement = await measurementRes.json();
  console.log('Measurement created:', measurement.data.measurement.id);
}
```

### Use Case 2: Admin Views All Measurements

```javascript
// Admin can see measurements from all customers
async function adminViewAllMeasurements() {
  const adminToken = localStorage.getItem('adminToken');
  
  const response = await fetch('/api/measurements', {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  
  const data = await response.json();
  console.log(`Total measurements: ${data.count}`);
  
  // Group by customer
  const byCustomer = data.data.measurements.reduce((acc, m) => {
    acc[m.user_id] = acc[m.user_id] || [];
    acc[m.user_id].push(m);
    return acc;
  }, {});
  
  console.log('Measurements by customer:', byCustomer);
}
```

### Use Case 3: Update Measurement After Gaining Weight

```javascript
async function updateAfterWeightChange(measurementId) {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(`/api/measurements/${measurementId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      waist: 34, // Increased from 32
      notes: 'Updated after gaining weight'
    })
  });
  
  const data = await response.json();
  if (data.success) {
    console.log('Measurement updated successfully');
  }
}
```

---

## 📝 Notes

- **Measurement History:** Each measurement is a separate record. To track changes over time, create new measurements instead of updating existing ones.
- **Unit Consistency:** Measurements are stored as provided. Frontend should handle unit conversions if needed.
- **Soft Delete:** Currently using hard delete. Consider implementing soft delete (is_deleted flag) to maintain history.
- **Latest Measurement:** Use `GET /api/measurements` and sort by `created_at DESC` to get the most recent measurement.

---

## 🔗 Related Documentation

- [Authentication API Documentation](./AUTH_API_DOCUMENTATION.md)
- Orders API Documentation (Coming soon)
- Invoices API Documentation (Coming soon)

---

## 📞 Support

For issues or questions:
- **Email:** support@tailoring-system.com
- **Repository:** [GitHub Link]
- **Documentation:** [Wiki Link]

---

**Last Updated:** November 12, 2025  
**API Version:** 1.0.0
