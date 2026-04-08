export const PAGES = {
    HOME: "/",
    SMARTPHONE: (smartphoneId: string) => `/smartphone/id/${smartphoneId}`,
    SMARTPHONE_CREATE: "/smartphone/create",
    USER: (username: string) => `/user/${username}`,
    REGISTER: "/register",
    LOGIN: "/login"
}