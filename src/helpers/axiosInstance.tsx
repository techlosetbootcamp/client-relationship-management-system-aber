import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_API_URL
    : process.env.NEXT_PUBLIC_LOCAL_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 20000,
});
