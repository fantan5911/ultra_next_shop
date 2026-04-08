import { api } from "@/api/axios";
import { AuthResponse } from "@/shared/response/auth.response";
import { AxiosResponse } from "axios";


class AuthService {
    async Register(email: string, username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        const response = await api.post<AuthResponse>('/users/register', {
            email: email,
            username: username,
            password: password
        })
        return response;
    }
    async Login(email: string, username: string, password: string) {
        const response = await api.post<AuthResponse>('/users/login', {
            email: email,
            username: username,
            password: password
        })
        return response;
    }
}

export default new AuthService();