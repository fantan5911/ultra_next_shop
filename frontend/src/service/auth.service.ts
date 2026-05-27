import { $api } from "@/api/axios";
import { API_URL } from "@/constants/api.url";
import { AuthResponse } from "@/shared/response/auth.response";
import axios, { AxiosResponse } from "axios";

const isBrowser = typeof window !== 'undefined';

async function getCookies() {
    if (!isBrowser) return null;
    const Cookies = (await import('js-cookie')).default;
    return Cookies;
}

class AuthService {
    async Register(email: string, username: string, password: string, acceptedTerms: boolean): Promise<AxiosResponse<AuthResponse | undefined> | void> {
        try {
            const response = await $api.post<AuthResponse>(`/users/register`, {
                email: email,
                username: username,
                password: password,
                accepted_terms: acceptedTerms
            })
            console.log(response);
            if (response.status == 200 && response?.data.accessToken) {
                const Cookies = await getCookies();
                Cookies?.set('accessToken', response?.data.accessToken);
            }

            return response;
        }
        catch (error: any) {
            console.log(error.response);
            return error.response;
        }

    }
    async Login(email: string, password: string) {
        try {
            const response = await $api.post<AuthResponse>(`/users/login`, {
                email: email,
                password: password
            }) 
            console.log(response);
            if (response.status === 200 && response?.data.accessToken) {
                const Cookies = await getCookies();
                Cookies?.set('accessToken', response?.data.accessToken);
            }
            return response;
        }
        catch (error: any) {
            console.log(error.response);
            return error.response;
        }
    }

    async Logout() {
        try {
            const response = await $api.get('/users/logout');
            if (response.status === 200) {
                return true;
            }
        }
        catch (error: any) {
            console.log(error.response);
            return error.response;
        }
    }

    async checkAuth() {
        try {
            const response = await $api.get(`/users/refresh`);
            const Cookies = await getCookies();
            if (Cookies && response.data.accessToken) {
                Cookies.set('accessToken', response.data.accessToken);
            }
            return true;
        } 
        catch (error: any) {
            console.log('Ошибка авторизации:', error.response?.status, error.message);
            return false;
        }
    }
}

export default new AuthService();