// src/api/http.ts
import axios, { type AxiosRequestConfig, type AxiosResponse, AxiosError, AxiosHeaders } from "axios";
import { PathConfig } from "../config/PathConfig";
import { ToasterService } from "../components/common/Toastr";

const http = axios.create({
  baseURL: PathConfig.API_ENDPOINT,
  headers: new AxiosHeaders({
    "Content-Type": "application/json",
  }),
});

// Request interceptor
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Cast to InternalAxiosRequestConfig to satisfy TS
    const cfg = config as unknown as import("axios").InternalAxiosRequestConfig;

    // Ensure headers exist and are of type AxiosHeaders
    if (!cfg.headers) {
      cfg.headers = new AxiosHeaders();
    } else if (!(cfg.headers instanceof AxiosHeaders)) {
      cfg.headers = new AxiosHeaders(cfg.headers);
    }

    const token = localStorage.getItem("token");
    const tenantId = localStorage.getItem("tenant");

    if (token) {
      cfg.headers.set("Authorization", `Bearer ${token}`);
    }

    if (tenantId) {
      cfg.headers.set("X-Tenant", tenantId);
    }

    // TODO: show loader

    return cfg;
  },
  (error) => Promise.reject(error)
);


// Response interceptor
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // TODO: Hide loader
    return response;
  },
  async (error: AxiosError) => {
    // TODO: Hide loader
    const originalRequest = error.config;

    if (!error.response) {
      ToasterService.typeError("Network Error");
      return Promise.reject(error);
    }

    const status = error.response.status;
    const originalUrl = error.config?.url || "";

    if (status === 401) {
      // Allow login endpoint to handle its own error
      if (originalUrl.includes("/auth/login")) {
        return Promise.reject(error);
      }
      // Token expired or unauthorized
      ToasterService.typeError("Unauthorized. Please login again.");
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (status === 403) {
      ToasterService.typeError("Forbidden");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Other errors
    const message =
      (error.response.data as any)?.message || error.message || "Error";
    ToasterService.typeError(message);

    return Promise.reject(error);
  }
);

export default http;
