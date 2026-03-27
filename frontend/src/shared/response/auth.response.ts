import { IUser } from "../types/user.types";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}