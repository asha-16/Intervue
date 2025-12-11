import axios from "axios";

// Dynamically choose API URL based on environment
const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // sends cookies automatically
});

export default axiosInstance;
