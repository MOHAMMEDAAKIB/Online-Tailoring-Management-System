import api from "./apiService";

// Get all measurements (customer gets their own, admin gets all or filtered by customer_id)
export const getAllMeasurements = (customer_id = null) => {
  const params = customer_id ? { customer_id } : {};
  return api.get("/api/measurements", { params });
};

// Create a new measurement
export const createMeasurement = (data) => {
  return api.post("/api/measurements", data);
};

// Get measurement by ID
export const getMeasurementById = (id) => {
  return api.get(`/api/measurements/${id}`);
};

// Update measurement by ID
export const updateMeasurement = (id, data) => {
  return api.put(`/api/measurements/${id}`, data);
};

// Delete measurement by ID
export const deleteMeasurement = (id) => {
  return api.delete(`/api/measurements/${id}`);
};
