// client/src/lib/api.ts

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { ApiError } from "./errors";
import type { AuthHeaders } from "./types";
import type { Lead, CreateLeadPayload } from "../models/lead";

const DEFAULT_BASE = "http://localhost:4000/api";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_BASE;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------
// REQUEST INTERCEPTOR
// ------------------------
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (token) {
      // Fully typed header injection
      const headers = config.headers as AuthHeaders;
      headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------------
// RESPONSE INTERCEPTOR
// ------------------------
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as
        | { message?: string }
        | undefined;

      const message =
        data?.message ||
        error.message ||
        `API error ${status}`;

      throw new ApiError(message, status, data);
    }

    throw new ApiError(
      error.message || "Network error",
      undefined,
      undefined
    );
  }
);

// ------------------------
// TYPED API FUNCTIONS
// ------------------------

export async function getLeads(): Promise<Lead[]> {
  const { data } = await api.get<Lead[]>("/leads");
  return data;
}

export async function createLead(
  payload: CreateLeadPayload
): Promise<Lead> {
  const { data } = await api.post<Lead>("/leads", payload);
  return data;
}

export async function getLeadById(id: string): Promise<Lead> {
  const { data } = await api.get<Lead>(`/leads/${id}`);
  return data;
}

export async function updateLead(
  id: string,
  payload: Partial<CreateLeadPayload>
): Promise<Lead> {
  const { data } = await api.put<Lead>(`/leads/${id}`, payload);
  return data;
}

export async function deleteLead(
  id: string
): Promise<{ success: true }> {
  const { data } = await api.delete<{ success: true }>(
    `/leads/${id}`
  );
  return data;
}

export default api;
