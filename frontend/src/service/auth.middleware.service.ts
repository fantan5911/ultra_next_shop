import { NextRequest } from "next/server";

export class AuthMiddlewareService {
    static async checkAuth(request: NextRequest) {
        const token = request.cookies.get('accessToken')?.value;
        
        if (!token) {
            return false;
        }
        try {
            const response = await fetch(`${process.env.API_URL}/users/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response;
        } catch {
            return false;
        }
    }
}
