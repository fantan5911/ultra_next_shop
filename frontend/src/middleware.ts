import { NextRequest, NextResponse } from "next/server";
import { AuthorizedPages, PAGES } from "./config/pages.config";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get('accessToken')?.value;
    
    // const isProtectedRoute = AuthorizedPages.includes(pathname);
    // const isAuthRoute = pathname === PAGES.LOGIN || pathname === PAGES.REGISTER;

    // if (token && isAuthRoute) {
    //     return NextResponse.redirect(new URL(PAGES.HOME, request.url));
    // }
    
    // if (isProtectedRoute && !token) {
    //     return NextResponse.redirect(new URL(PAGES.LOGIN, request.url));
    // }
    
    return NextResponse.next();
}