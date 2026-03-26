import { Router } from "express";
import brandController from "../controllers/brands/brand.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/add", brandController.addBrand);
router.get("/", brandController.getBrands);
router.get("/id/:id", brandController.findBrandById);
router.delete("/id/:id", brandController.deleteBrandById)

export default router;