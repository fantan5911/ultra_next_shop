import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware";
import smartphoneController from "../controllers/smartphones/smartphone.controller";

const router = Router();

router.post("/add", AuthMiddleware({checkBan: true}), smartphoneController.addSmartphone);
router.get("/", smartphoneController.getSmartphones);



export default router;