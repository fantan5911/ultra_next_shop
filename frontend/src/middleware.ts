import { NextRequest, NextResponse } from "next/server";
import { PAGES } from "./config/pages.config";
import {AuthMiddlewareService} from "./service/auth.middleware.service";

export default async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith(PAGES.SMARTPHONE_CREATE)) {
        const token = AuthMiddlewareService.checkAuth(request);
        if (!token) {
            const response = NextResponse.redirect(new URL(PAGES.LOGIN, request.url));
            return response;
        }
        else {
            if (pathname.startsWith(PAGES.LOGIN || PAGES.REGISTER)) {
                const response = NextResponse.redirect(new URL(PAGES.HOME, request.url));
                return response;
            }
        }
    }
}
