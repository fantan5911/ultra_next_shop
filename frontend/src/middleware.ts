import { NextRequest, NextResponse } from "next/server";
import { PAGES } from "./config/pages.config";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AuthorizedPages = [PAGES.SMARTPHONE_CREATE, PAGES.CART];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isProtectedRoute = AuthorizedPages.some((page) =>
    pathname.startsWith(page),
  );
  const isAuthRoute =
    pathname === PAGES.LOGIN ||
    pathname === PAGES.REGISTER ||
    pathname === PAGES.SEND ||
    pathname.startsWith("/activate");

  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL(PAGES.HOME, request.url));
  }

  if (isProtectedRoute) {
    const isBanned = await fetch(`${API_URL}/users/checkBan`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    if (!isBanned.ok && isBanned.status === 403) {
      return NextResponse.redirect(new URL(PAGES.BANNED, request.url));
    }
    if (refreshToken) {
      try {
        const response = await fetch(`${API_URL}/users/refresh`, {
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user?.isBanned) {
            return NextResponse.redirect(new URL(PAGES.BANNED, request.url));
          }
          if (data.accessToken) {
            const responseWithNewToken = NextResponse.next();
            responseWithNewToken.cookies.set("accessToken", data.accessToken, {
              maxAge: 15 * 60,
              httpOnly: true,
            });

            if (data.refreshToken) {
              responseWithNewToken.cookies.set(
                "refreshToken",
                data.refreshToken,
                {
                  maxAge: 30 * 24 * 60 * 60,
                  httpOnly: true,
                },
              );
            }
            return responseWithNewToken;
          }
        }
      } catch (error) {
        console.error("Ошибка при обновлении токена:", error);
      }
    }

    if (!accessToken) {
      return NextResponse.redirect(new URL(PAGES.LOGIN, request.url));
    }
  }

  return NextResponse.next();
}
