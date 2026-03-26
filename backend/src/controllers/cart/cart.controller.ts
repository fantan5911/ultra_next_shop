import { NextFunction, Request, Response } from "express";
import cartService from "../../service/cart.service";


class cartController {
    async findCartById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const cart = await cartService.findCartById(id);
            return res.status(200).json(cart);
        }
        catch (e) {
            next(e);
        }
    }
    async findCartByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userid = req.params.id as string;
            const cart = await cartService.findCartById(userid);
            return res.status(200).json(cart);
        }
        catch (e) {
            next(e);
        }
    }
}


export default new cartController();