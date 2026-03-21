import { Router } from "express";
import UserRoutes from './user.routes';
import SmartphoneRoutes from './smartphone.routes';

const router = Router();

router.use("/users", UserRoutes);
router.use("/smartphones", SmartphoneRoutes);

export default router;