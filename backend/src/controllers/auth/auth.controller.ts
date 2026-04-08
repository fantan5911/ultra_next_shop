import { Request, Response, NextFunction } from "express";
import ApiError from "../../errors/api.error";
import { prisma } from "../..";
import userService from "../../service/user.service";
import { ENV } from "../../env";


class AuthController {
    async Register(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, username, password, acceptedTerms} = req.body;
            const userData = await userService.Register(email, username, password, acceptedTerms);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            console.log("Пользователь зарегистрирован:", userData);
            return res.status(200).json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async Login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await userService.Login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            console.log("Пользователь вошел:", userData);
            return res.status(200).json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async Logout(req: Request, res: Response, next: NextFunction) {
         try {
            const {refreshToken} = req.cookies;
            const token = await userService.Logout(refreshToken);
            res.clearCookie('refreshToken');

            return res.status(200).json(token);
         }
         catch (e) {
            next(e);
         }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const link = req.params.link as string;
            await userService.activate(link);
            return res.redirect(ENV.CLIENT_URL);
        }
        catch (e) {
            next(e);
        }
    }

    async Ban(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId, isBanned} = req.body;
            const user = await userService.Ban(userId, isBanned);
            return res.status(200).json(user);
        }
        catch (e) {
            next(e);
        }
    }

    async GetUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.GetUsers();
            return res.status(200).json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const user = await userService.getUserById(id);
            return res.status(200).json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async getUserByName(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.params.username as string;
            const user = await userService.getUserByName(username);
            return res.status(200).json(user);
        }
        catch (e) {
            next(e);
        }
    }
    checkAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                return next(ApiError.UnAuthorizedError());
            }
            const accessToken = authorization.split(' ')[1];
            if (!accessToken || authorization[0] !== 'Bearer') {
                return next(ApiError.UnAuthorizedError());
            }
            const tokenData = userService.checkAuth(accessToken);
            return res.status(200).json(tokenData);
        }
        catch (e) {
            next(e);
        }
    }
}

export default new AuthController();