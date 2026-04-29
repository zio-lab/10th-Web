import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
  }

  return config;
});