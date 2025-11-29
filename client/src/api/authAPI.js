import api from "./apiService";

export const registerUsers = (data) => api.post("/api/auth/register", data);
export const loginUsers = (data) => api.post("/api/auth/login", data);
export const updateProfile = (data) => api.put("/api/auth/profile", data);
export const refreshToken = (data) => api.post("/api/auth/refresh", data);
export const logoutUsers = () => api.post("/api/auth/logout");
export const changePassword = (data) => api.post("/api/auth/change-password", data);
export const getUserProfile = () => api.get("/api/auth/me");
export const getAllUsers = () => api.get("/api/auth/users");