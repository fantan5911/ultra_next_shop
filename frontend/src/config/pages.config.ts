export const PAGES = {
  HOME: "/",
  SMARTPHONE: (smartphoneId: string) => `/smartphone/id/${smartphoneId}`,
  SMARTPHONE_CREATE: "/smartphone/create",
  USER: (username: string) => `/user/${username}`,
  PROFILE: "/profile",
  SETTINGS: "/settings",
  BANNED: "/banned",
  SEND: "/send",
  REGISTER: "/register",
  LOGIN: "/login",
  CART: "/cart",
  TERMS: "/terms",
  POLICY: "/policy",
};

export const AuthorizedPages = [PAGES.SMARTPHONE_CREATE, PAGES.CART];
