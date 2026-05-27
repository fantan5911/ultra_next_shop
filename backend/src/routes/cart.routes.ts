import { Router } from "express";
import cartController from "../controllers/cart/cart.controller";

const router = Router();

router.get("/id/:id", cartController.findCartById);
router.get("/userid/:id", cartController.findCartByUserId);


export default router;