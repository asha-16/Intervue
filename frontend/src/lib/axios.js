import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`, // <--- add /api here
  withCredentials: true,
});

export default axiosInstance;
