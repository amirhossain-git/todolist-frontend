import axios from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env.apiUrl,
  timeout: 15000
});

function normalizeError(error) {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";
  return new Error(message);
}

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(normalizeError(err))
);

