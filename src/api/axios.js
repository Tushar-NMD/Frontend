import axios from "axios";

// Create an Axios instance
const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://fullstack-d5re.onrender.com/api',
});

// Request Interceptor to add the token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor for handling errors like 401
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default API;