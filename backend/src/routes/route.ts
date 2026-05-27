import { Router } from "express";
import UserRoutes from './user.routes';
import SmartphoneRoutes from './smartphone.routes';
import BrandRoutes from './brand.routes';
import CartRoutes from './cart.routes';
import CartItemRoutes from './cart_item.routes';

const router = Router();

router.use("/users", UserRoutes);
router.use("/smartphones", SmartphoneRoutes);
router.use("/brands", BrandRoutes);
router.use("/cart", CartRoutes);
router.use("/cart_item", CartItemRoutes);

export default router;