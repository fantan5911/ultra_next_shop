import { api } from "@/api/axios";
import { AuthResponse } from "@/shared/types/auth.response";
import { AxiosResponse } from "axios";


class AuthService {
    async Register(email: string, name: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        const response = await api.post<AuthResponse>('/users/register', {
            email: email,
            name: name,
            password: password
        })
        return response;
    }
    async Login(email: string, name: string, password: string) {
        const response = await api.post<AuthResponse>('/users/login', {
            email: email,
            name: name,
            password: password
        })
        return response;
    }
}

export default new AuthService();