import { API_URL } from "@/constants/api.url";
import { AuthResponse } from "@/shared/response/auth.response";
import axios from "axios";

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

let refreshPromise: Promise<AuthResponse | null> | null = null;

const performRefresh = async (): Promise<AuthResponse | null> => {
  try {
    const response = await axios.get<AuthResponse>(`${API_URL}/users/refresh`, {
      withCredentials: true,
      timeout: 5000,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

$api.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const Cookies = (await import("js-cookie")).default;
  const token = Cookies.get("accessToken");
  if (token) {
    const headers = config.headers ?? {};
    (headers as any).Authorization = `Bearer ${token}`;
    config.headers = headers;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isRefreshRequest = originalRequest.url?.includes("/users/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._isRetry &&
      !isRefreshRequest
    ) {
      originalRequest._isRetry = true;

      if (typeof window === "undefined") {
        return Promise.reject(error);
      }

      try {
        if (!refreshPromise) {
          refreshPromise = performRefresh();
        }

        const data = await refreshPromise;
        refreshPromise = null;

        if (data?.accessToken) {
          const Cookies = (await import("js-cookie")).default;
          Cookies.set("accessToken", data.accessToken);
        }

        return $api.request(originalRequest);
      } catch (error) {
        refreshPromise = null;
        const Cookies = (await import("js-cookie")).default;
        Cookies.remove("accessToken");
        console.log("НЕ АВТОРИЗОВАН", error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
