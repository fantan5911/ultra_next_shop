import { Router } from "express";
import cart_itemController from "../controllers/cart_items/cart_item.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post('/add/:smartphoneId', AuthMiddleware({checkBan: true}), cart_itemController.addItemToCart);
router.get('/all', AuthMiddleware({checkBan: true}), cart_itemController.getItemsByCartId);
router.get('/smartphone/:smartphoneId', AuthMiddleware({checkBan: true}), cart_itemController.getCartItemBySmartphoneId);
router.delete('/delete/:cartItemId', AuthMiddleware({checkBan: true}), cart_itemController.deleteCartItem);


export default router;