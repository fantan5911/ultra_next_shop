import { NextFunction, Request, Response } from "express";
import cart_itemService from "../../service/cart_item.service";
import { addItemValidate } from "../../validations/cart_item/add-item.validate";
import ApiError from "../../errors/api.error";


class cartItemController {
    async addItemToCart(req: Request, res: Response, next: NextFunction) {
        try {
            const validation = addItemValidate.safeParse(req.params);
            if (!validation.success) {
                return next(ApiError.BadValidation());
            }
            const cartId = req.user?.cartId;
            if (!cartId || cartId == null) {
                return next(ApiError.BadValidation());
            }
            const smartphoneId = req.params.smartphoneId as string;
            const cart_item = await cart_itemService.addItemToCart(cartId, smartphoneId);
            return res.status(200).json(cart_item); 
        }
        catch (e) {
            next(e);
        }
    }
    async getItemsByCartId(req: Request, res: Response, next: NextFunction) {
        try {
            const cart_items = await cart_itemService.getItemsByCartId(req.user?.cartId as string);
            return res.status(200).json(cart_items);
        }
        catch (e) {
            next(e);
        }
    }
    async getCartItemBySmartphoneId(req: Request, res: Response, next: NextFunction) {
        try {
            const validation = addItemValidate.safeParse(req.params);
            if (!validation.success) {
                return next(ApiError.BadValidation());
            }
            const smartphoneId = req.params.smartphoneId as string;
            const cart_item = await cart_itemService.getCartItemBySmartphoneId(req.user?.cartId as string, smartphoneId);
            return res.status(200).json(cart_item);
        }
        catch (e) {
            next(e);
        }
    }
}

export default new cartItemController();