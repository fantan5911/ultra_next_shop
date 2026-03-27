import { Request, Response, NextFunction } from "express";
import ApiError from "../../errors/api.error";
import { prisma } from "../..";
import userService from "../../service/user.service";
import { ENV } from "../../env";


class AuthController {
    async Register(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, name, password} = req.body;
            const userData = await userService.Register(email, name, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
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
            const name = req.params.name as string;
            const user = await userService.getUserByName(name);
            return res.status(200).json(user);
        }
        catch (e) {
            next(e);
        }
    }
}

export default new AuthController();