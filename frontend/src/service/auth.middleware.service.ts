import { NextRequest } from "next/server";
import authService from "./auth.service";

export class AuthMiddlewareService {
    static async checkAuth(request: NextRequest) {
        const token = request.cookies.get('accessToken')?.value;

        if (!token) {
            return false;
        }

        try {
            return await authService.checkAuth();
        } catch {
            return false;
        }
    }
}