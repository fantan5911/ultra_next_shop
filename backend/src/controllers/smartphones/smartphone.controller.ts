import {Request, Response, NextFunction} from 'express';
import tokenService from '../../service/token.service';
import smartphoneService from '../../service/smartphone.service';
import ApiError from '../../errors/api.error';
import { IUser } from '../../types/user.types';


class smartPhoneController {
    async getSmartphones(req: Request, res: Response, next: NextFunction) {
        try {
            const smartphones = await smartphoneService.getSmartphones();
            
            return res.status(200).json(smartphones);
        }
        catch (e) {
            next(e);
        }
    }
    async getSmartPhoneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const smartphone = await smartphoneService.getSmartPhoneById(id);

            return res.status(200).json(smartphone);
        }
        catch (e) {
            next(e);
        }
    }

    async getSmartphonesByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            const smartphones = await smartphoneService.getSmartphonesByUserId(userId);

            return res.status(200).json(smartphones);
        }
        catch (e) {
            next(e);
        }
    }

    async addSmartphone(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, description, specifications, imageUrl, brandId, price} = req.body;
            const authorization = req.headers.authorization;
            if (!authorization) {
                return next(ApiError.UnAuthorizedError());
            }
            const accessToken = authorization.split(' ')[1];
            const userData = tokenService.validateAccessToken(accessToken) as IUser;
            if (!accessToken) {
                next(ApiError.UnAuthorizedError());
            }

            const smartphone = 
            await smartphoneService.addSmartphone(userData.id, name, description, specifications, imageUrl, brandId, price);

            return res.status(200).json({message: `создан смартфон с id: ${smartphone.id}`});
        }
        catch (e) {
            next(e);
        }
    }
}

export default new smartPhoneController();