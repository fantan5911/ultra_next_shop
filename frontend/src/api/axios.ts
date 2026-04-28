'use client';
import Cookies from "js-cookie";
import { API_URL } from "@/constants/api.url";
import { AuthResponse } from "@/shared/response/auth.response";
import axios from "axios";


export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use(config => {
    return config;
}, async error => {
    const originalRequest = error.config;
    if (!originalRequest) {
        return Promise.reject(error);
    }

    const isRefreshRequest = originalRequest.url?.includes('/users/refresh');
    if (error.response?.status === 401 && !originalRequest._isRetry && !isRefreshRequest) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/users/refresh`, {withCredentials: true});
            localStorage.setItem('accessToken', response.data.accessToken);
            return api.request(originalRequest);
        }
        catch (e) {
            console.log('НЕ АВТОРИЗОВАН', e);
        }
    }

    return Promise.reject(error);
})
