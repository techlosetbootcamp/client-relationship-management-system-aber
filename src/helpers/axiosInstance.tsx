import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://client-relationship-management-system-techloset.vercel.app/api"
    // ? "client-relationship-management-system-techloset.vercel.app/api"
    : "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout:30000
});
