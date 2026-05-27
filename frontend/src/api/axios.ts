import { API_URL } from "@/constants/api.url";
import { AuthResponse } from "@/shared/response/auth.response";
import axios from "axios";

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(async config => {
    if (typeof window === 'undefined') {
        return config;
    }

    const Cookies = (await import('js-cookie')).default;
    const token = Cookies.get('accessToken');
    if (token) {
        const headers = config.headers ?? {};
        (headers as any).Authorization = `Bearer ${token}`;
        config.headers = headers;
    }
    return config;
})

function deleteCookie(name: string) {
    // Удаляем с разными комбинациями path
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost;`;
    
    // Если был установлен другой путь
    const currentPath = window.location.pathname;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${currentPath};`;
}

$api.interceptors.response.use(config => {
    return config;
}, async error => {
    const originalRequest = error.config;
    if (!originalRequest) {
        return Promise.reject(error);
    }

    const isRefreshRequest = originalRequest.url?.includes('/users/refresh');
    
    if (error.response?.status === 401 && !originalRequest._isRetry && !isRefreshRequest) {
        originalRequest._isRetry = true;

        if (typeof window === 'undefined') {
            return Promise.reject(error);
        }

        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/users/refresh`, {withCredentials: true});
            const Cookies = (await import('js-cookie')).default;
            Cookies.set('accessToken', response.data.accessToken);
            return $api.request(originalRequest);
        }
        catch (e) {
            const Cookies = (await import('js-cookie')).default;
            Cookies.remove('accessToken');
            console.log('НЕ АВТОРИЗОВАН', e);
            return Promise.reject(e);
        }
    }
    
    else if (error.response?.status === 401) {
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;';
    
        // Проверка: что осталось?
        console.log('После удаления, куки:', document.cookie);
    }

    return Promise.reject(error);
})

