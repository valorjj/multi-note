// src/api/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Always grab the latest accessToken before sending each request:
api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Handle 401 → refresh flow as you had it:
api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            try {
                // Try to get a new access token via the refresh endpoint
                const refreshRes = await api.post("/auth/refresh");
                const newToken = refreshRes.data.accessToken;
                localStorage.setItem("accessToken", newToken);

                // Retry the original request with the new token
                error.config.headers["Authorization"] = `Bearer ${newToken}`;
                return axios.request(error.config);
            } catch (refreshErr) {
                // Refresh failed → force logout
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
