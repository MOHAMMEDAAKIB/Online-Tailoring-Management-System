# Measurement API Quick Reference

## 🔗 Base URL
```
http://localhost:4000/api/measurements
```

## 🔑 Authentication
All endpoints require authentication token in header:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 📍 Endpoints

### 1. GET All Measurements
```http
GET /api/measurements
```
**Customer:** Returns only their measurements  
**Admin:** Returns all measurements (can filter with `?customer_id=5`)

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": {
    "measurements": [...]
  }
}
```

---

### 2. POST Create Measurement
```http
POST /api/measurements
Content-Type: application/json
```

**Body:**
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
  "notes": "Standard fit"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Measurement created successfully",
  "data": {
    "measurement": {...}
  }
}
```

---

### 3. GET Measurement by ID
```http
GET /api/measurements/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "measurement": {...}
  }
}
```

---

### 4. PUT Update Measurement
```http
PUT /api/measurements/:id
Content-Type: application/json
```

**Body:** (Only include fields to update)
```json
{
  "waist": 33,
  "notes": "Updated measurement"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Measurement updated successfully",
  "data": {
    "measurement": {...}
  }
}
```

---

### 5. DELETE Measurement
```http
DELETE /api/measurements/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Measurement deleted successfully"
}
```

---

## 📝 Field Specifications

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| chest | float | No | Chest measurement |
| waist | float | No | Waist measurement |
| hips | float | No | Hips measurement |
| sleeve | float | No | Sleeve length |
| shoulder | float | No | Shoulder width |
| neck | float | No | Neck circumference |
| length | float | No | Garment length |
| unit | string | No | "cm", "inch", or "m" (default: "cm") |
| notes | string | No | Max 500 characters |

---

## ⚠️ Common Errors

| Status | Message | Cause |
|--------|---------|-------|
| 401 | "No token provided" | Missing authentication token |
| 403 | "You can only access your own measurements" | Trying to access another customer's data |
| 404 | "Measurement not found" | Invalid measurement ID |
| 400 | "Validation failed" | Invalid field values |

---

## 💻 Code Examples

### Create Measurement
```javascript
import { createMeasurement } from './api/masermentAPI';

const data = {
  chest: 38.5,
  waist: 32,
  unit: 'inch',
  notes: 'Standard fit'
};

const response = await createMeasurement(data);
console.log(response.data.data.measurement.id);
```

### Get All Measurements
```javascript
import { getAllMeasurements } from './api/masermentAPI';

const response = await getAllMeasurements();
const measurements = response.data.data.measurements;
```

### Update Measurement
```javascript
import { updateMeasurement } from './api/masermentAPI';

const updates = { waist: 33 };
const response = await updateMeasurement(15, updates);
```

### Delete Measurement
```javascript
import { deleteMeasurement } from './api/masermentAPI';

const response = await deleteMeasurement(15);
```

---

## 🎯 Frontend Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/customer/measurements` | MyMeasurementsPage | View all measurements |
| `/customer/measurements/new` | MeasurementFormPage | Create new measurement |
| `/customer/measurements/edit/:id` | EditMeasurementPage | Edit existing measurement |

---

## ✅ Status
All API endpoints are integrated and working!
