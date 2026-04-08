import { NextFunction, Request, Response } from "express";
import cart_itemService from "../../service/cart_item.service";


class cartItemController {
    async addItemToCart(req: Request, res: Response, next: NextFunction) {
        try {
            const {cartId, SmartphoneId} = req.body;
            const cart_item = await cart_itemService.addItemToCart(cartId, SmartphoneId);
            return res.status(200).json(cart_item);
        }
        catch (e) {
            next(e);
        }
    }
}

export default new cartItemController();