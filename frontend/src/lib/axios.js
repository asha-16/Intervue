import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;

// Add trailing /api consistently
const apiBase = baseURL.endsWith("/api") ? baseURL : `${baseURL}/api`;

const axiosInstance = axios.create({
  baseURL: apiBase,
  withCredentials: true, // allows browser to send cookies with requests
});

export default axiosInstance;
