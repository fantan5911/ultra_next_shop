import { prisma } from "..";
import { argon2_config } from "../configs/argon2.config";
import ApiError from "../errors/api.error";
import * as argon2 from 'argon2';
import mailService from "./mail.service";
import { ENV } from "../env";
import UserDto from "../dto/user.dto";
import tokenService from "./token.service";
import { IUser } from "../types/user.types";
import cartService from "./cart.service";

class UserService {
    async Register(email: string, name: string, password: string) {
        const searchedUser = await prisma.user.findUnique({
            where: {email}
        })
        if (searchedUser) {
            throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует`);
        }
        const hashPassword = await argon2.hash(password, argon2_config);
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                name: name
            },
            include: {
                smartphones: true,
                cart: true
            }
        })
        const cart = await cartService.createCart(user.id);
        // await mailService.sendActivationMail(email, `${ENV.API_URL}/api/users/activate/${user.activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
    async Login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            throw ApiError.BadRequest('Неверный логин или пароль');
        }
        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) {
            throw ApiError.BadRequest('Неверный логин или пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        const data = tokenService.saveToken(user.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async Logout(refreshToken: string) {
        const token = tokenService.removeToken(refreshToken);
        return token;
    }
    
    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnAuthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken) as IUser;
        const tokenFromDB = await tokenService.findRefreshToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.UnAuthorizedError();
        }
        const user: any = await prisma.user.findUnique({
            where: {
                id: userData.id
            }
        })
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
    async activate(activationLink: string) {
        const user = await prisma.user.findUnique({
            where: {activationLink: activationLink}
        })
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка для активации');
        }
        if (user.isActivated === true) {
            throw ApiError.BadRequest('Аккаунт уже активирован');
        }
        const updatedUser = await prisma.user.update({
            where: {activationLink: activationLink},
            data: {isActivated: true}
        })
        return updatedUser;
    }
    async Ban(userId: string, isBanned: boolean) {
        const user = await prisma.user.findUnique({
            where: {id: userId}
        });
        if (!user) {
            throw ApiError.NotFound('Пользователя с данным id нет');
        }
        const updatedUser = await prisma.user.update({
            where: {id: userId},
            data: {
                isBanned: isBanned
            }
        });
        return updatedUser;
    }
    async GetUsers() {
        const users = await prisma.user.findMany();
        return users;
    }
    async getUserById(userId: string) {
        const user = await prisma.user.findUnique({
            where: {id: userId}
        })
        if (!user) {
            throw ApiError.NotFound("Пользователь с данным id не найден");
        }
        return user;
    }
    async getUserByName(name: string) {
        const user = await prisma.user.findUnique({
            where: {name: name}
        })
        if (!user) {
            throw ApiError.NotFound("Пользователь с данным id не найден");
        }
        return user;
    }
}

export default new UserService();