import { prisma } from "..";
import { argon2_config } from "../configs/argon2.config";
import ApiError from "../errors/api.error";
import * as argon2 from "argon2";
// import mailService from "./mail.service";
// import { ENV } from "../env";
import UserDto from "../dto/user.dto";
import tokenService from "./token.service";
import { IUser } from "../types/user.types";
import cartService from "./cart.service";
import generateService from "./generate.service";
import mailService from "./mail.service";
import { ENV } from "../env";

class UserService {
  async Register(
    email: string,
    username: string,
    password: string,
    acceptedTerms: boolean,
  ) {
    if (!acceptedTerms) {
      throw ApiError.BadRequest("Вы должны принять условия использования");
    }
    const searchedUser = await prisma.user.findUnique({
      where: { email },
    });
    if (searchedUser && searchedUser.isActivated) {
      throw ApiError.BadRequest(
        `Пользователь с почтой ${email} уже существует`,
      );
    }
    const usernameCandidate = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });
    if (usernameCandidate && usernameCandidate.isActivated) {
      throw ApiError.BadRequest(
        `Пользователь с именем ${username} уже существует`,
      );
    }
    const hashPassword = await argon2.hash(password, argon2_config);
    const activationLink = generateService.generateActivationLink();
    const user = await prisma.user.upsert({
      where: { email: email },
      update: {
        password: hashPassword,
        username: username.toLowerCase(),
        acceptedTerms: acceptedTerms,
        activationLink: activationLink,
        isActivated: false,
        isBanned: false,
      },
      create: {
        email: email,
        password: hashPassword,
        username: username.toLowerCase(),
        activationLink: activationLink,
        acceptedTerms: acceptedTerms,
        isActivated: false,
        isBanned: false,
      },
      include: {
        smartphones: true,
        cart: true,
      },
    });
    // await mailService.sendActivationMail(
    //   email,
    //   `${ENV.API_URL}/api/users/activate/${user.activationLink}`,
    // );

    return {
      id: user.id,
      email: user.email,
    };
  }
  async Login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        cart: true,
      },
    });
    if (!user) {
      throw ApiError.BadRequest("Неверный email или пароль");
    }
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      throw ApiError.BadRequest("Неверный email или пароль");
    }
    const isActivated = user.isActivated;
    if (!isActivated) {
      throw ApiError.BadRequest("Неверный email или пароль");
    }

    if (!user.cart) {
      user.cart = await prisma.cart.create({
        data: { userId: user.id },
      });
    }

    const userDto = new UserDto({
      ...user,
      cartId: user.cart.id,
    });
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
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
    const user = await prisma.user.findUnique({
      where: {
        id: userData.id,
      },
      include: {
        cart: true,
      },
    });
    if (!user) {
      throw ApiError.UnAuthorizedError();
    }

    if (!user.cart) {
      user.cart = await prisma.cart.create({
        data: { userId: user.id },
      });
    }
    const userDto = new UserDto({
      ...user,
      cartId: user.cart.id,
    });
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async Ban(userId: string, isBanned: boolean) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw ApiError.NotFound("Пользователя с данным id нет");
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isBanned: isBanned,
      },
    });
    if (isBanned) {
      await prisma.smartphone.deleteMany({
        where: {
          userId: userId,
        },
      });
    }
    return updatedUser;
  }
  async GetUsers() {
    const users = await prisma.user.findMany();
    return users;
  }
  async SearchUsers(search: string) {
    if (!search) {
      const users = await prisma.user.findMany();
      return users;
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { id: { contains: search, mode: "insensitive" } },
          { username: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
    });
    return users;
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw ApiError.NotFound("Пользователь с данным id не найден");
    }
    return user;
  }
  async getUserByName(username: string) {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      throw ApiError.NotFound("Пользователь с данным username не найден");
    }
    return {
      username: user.username,
      avatarUrl: user.avatarUrl,
      isBanned: user.isBanned,
    };
  }

  async activate(activationLink: string) {
    const user = await prisma.user.findUnique({
      where: { activationLink: activationLink },
    });
    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isActivated: true,
      },
    });
    const cart = await cartService.upsertCart(updatedUser.id);
    const userDto = new UserDto({
      ...updatedUser,
      cartId: cart.id,
    });
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(updatedUser.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  // checkAuth(accessToken: string) {
  //     const accessToken = validateAc
  // }
}

export default new UserService();
