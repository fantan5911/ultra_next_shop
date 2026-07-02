import { NextFunction, Request, Response } from "express";
import cart_itemService from "../../service/cart_item.service";
import { addItemValidate } from "../../validations/cart_item/add-item.validate";
import ApiError from "../../errors/api.error";
import { updateCountValidate } from "../../validations/cart_item/update-count.validate";

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
      const cart_item = await cart_itemService.addItemToCart(
        cartId,
        smartphoneId,
      );
      return res.status(200).json(cart_item);
    } catch (e) {
      next(e);
    }
  }
  async getItemsByCartId(req: Request, res: Response, next: NextFunction) {
    try {
      const cart_items = await cart_itemService.getItemsByCartId(
        req.user?.cartId as string,
      );
      return res.status(200).json(cart_items);
    } catch (e) {
      next(e);
    }
  }
  async getCartItemBySmartphoneId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const validation = addItemValidate.safeParse(req.params);
      if (!validation.success) {
        return next(ApiError.BadValidation());
      }
      const smartphoneId = req.params.smartphoneId as string;
      const cart_item = await cart_itemService.getCartItemBySmartphoneId(
        req.user?.cartId as string,
        smartphoneId,
      );
      if (!cart_item) {
        return next(ApiError.NotFound("Товар не найден в корзине"));
      }
      return res.status(200).json(cart_item);
    } catch (e) {
      next(e);
    }
  }

  async deleteCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const cartItemId = req.params.cartItemId as string;
      await cart_itemService.deleteCartItem(cartItemId);
      return res
        .status(200)
        .json({ message: "Товар успешно удален из корзины" });
    } catch (e) {
      next(e);
    }
  }

  async updateCount(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = updateCountValidate.safeParse(req.body);
      if (!validation.success) {
        return next(ApiError.BadValidation());
      }
      const { cartItemId, count } = req.body;
      const updatedCartItem = cart_itemService.updateCount(cartItemId, count);

      return res.status(200).json(updatedCartItem);
    } catch (e) {
      next(e);
    }
  }
}

export default new cartItemController();
