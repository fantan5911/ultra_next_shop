import { Request, Response, NextFunction} from "express";
import ApiError from "../errors/api.error";
import tokenService from "../service/token.service";
import UserDto from "../dto/user.dto";
import { IUser } from "../types/user.types";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}


export default function AuthMiddleware(options?: { checkBan?: boolean }) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                return next(ApiError.UnAuthorizedError());
            }
            const token = authorization?.split(' ')[1];
            if (!token) {
                return next(ApiError.UnAuthorizedError());
            }

            const tokenData = tokenService.validateAccessToken(token) as IUser;
            if (!tokenData) {
                return next(ApiError.UnAuthorizedError());
            }
            if (tokenData.isBanned) {
                return next(ApiError.forbidden('Ваш аккаунт забанен навсегда'));
            }
            if (options?.checkBan && tokenData.isBanned) {
                return next(ApiError.forbidden("ваш аккаунт забанен навсегда"));
            }

            req.user = tokenData;
            next();
        }
        catch (e) {
            return next(ApiError.UnAuthorizedError());
        }
    }
}