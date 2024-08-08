import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "client-relationship-management-system-techloset.vercel.app/api"
    : "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: baseURL,
});
