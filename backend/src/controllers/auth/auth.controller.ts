import { Request, Response, NextFunction } from "express";
import ApiError from "../../errors/api.error";
import userService from "../../service/user.service";
import { ENV } from "../../env";
import { registerValidate } from "../../validations/user/register.validate";
import { loginValidate } from "../../validations/user/login.validate";
import tokenService from "../../service/token.service";
import UserDto from "../../dto/user.dto";
import { IUser } from "../../types/user.types";

class AuthController {
  async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = registerValidate.safeParse(req.body);
      if (!validation.success) {
        return next(ApiError.BadValidation());
      }
      const { email, username, password, accepted_terms } = req.body;

      const userData = await userService.Register(
        email,
        username,
        password,
        accepted_terms,
      );
      console.log(
        "Мы отправили ссылку для активации аккаунта на почту: ",
        userData,
      );
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }
  async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = loginValidate.safeParse(req.body);
      if (!validation.success) {
        return next(ApiError.BadValidation());
      }
      const { email, password } = req.body;
      const userData = await userService.Login(email, password);
      res.clearCookie("refreshToken");
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });
      console.log("Пользователь вошел:", userData);
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }
  async Logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.Logout(refreshToken);
      res.clearCookie("refreshToken");

      return res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.clearCookie("refreshToken");
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async Ban(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, isBanned } = req.body;
      const user = await userService.Ban(userId, isBanned);
      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  async GetUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.GetUsers();
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
  async SearchUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.params.search as string;

      const users = await userService.SearchUsers(search);
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const user = await userService.getUserById(id);
      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
  async getUserByName(req: Request, res: Response, next: NextFunction) {
    try {
      const username = req.params.username as string;
      const user = await userService.getUserByName(username);
      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
  checkAuth(req: Request, res: Response, next: NextFunction) {
    const userDto = new UserDto(req.user as IUser);
    const tokens = tokenService.generateTokens(userDto);
    return tokens;
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link as string;
      const userData = await userService.activate(activationLink);
      res.clearCookie("refreshToken");
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });

      if (userData.user.isActivated) {
        return res.status(200).json({
          message: "Этот аккаунт уже активирован",
        });
      }
      // return res.redirect(ENV.CLIENT_URL);
      return res.redirect(ENV.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
