import { Router } from "express";
import cartController from "../controllers/cart/cart.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/id/:id",
  AuthMiddleware({ checkBan: true }),
  cartController.findCartById,
);
router.get(
  "/userid/:id",
  AuthMiddleware({ checkBan: true }),
  cartController.findCartByUserId,
);

export default router;
