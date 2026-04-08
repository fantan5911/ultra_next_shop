'use client'

import Cookies from "js-cookie";
import { api } from "@/api/axios";
import { API_URL } from "@/constants/api.url";
import { AuthResponse } from "@/shared/response/auth.response";
import axios, { AxiosResponse } from "axios";


class AuthService {
    async Register(email: string, username: string, password: string, acceptedTerms: boolean): Promise<AxiosResponse<AuthResponse | undefined> | void> {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/users/register`, {
                email: email,
                username: username,
                password: password,
                acceptedTerms: acceptedTerms
            })
            console.log(response);
            if (response.status == 200 && response?.data.accessToken) {
                Cookies.set('accessToken', response?.data.accessToken);
                Cookies.set('auth', 'true');
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
            const response = await axios.post<AuthResponse>(`${API_URL}/users/login`, {
                email: email,
                password: password
            }) 
            console.log(response);
            if (response.status === 200 && response?.data.accessToken) {
                Cookies.set('accessToken', response?.data.accessToken);
                Cookies.set('auth', 'true');
            }
            return response;
        }
        catch (error: any) {
            console.log(error.response);
            return error.response;
        }
    }
    async checkAuth() {
        try {
            const response = await api.get(`/users/auth/me`);
            if (response.status === 200) {
                return true;
            }
        }
        catch (error: any) {
            return false;
        }
    }
}

export default new AuthService();