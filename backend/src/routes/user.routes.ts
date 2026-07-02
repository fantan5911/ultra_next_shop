import { Router } from "express";
import authController from "../controllers/auth/auth.controller";

const router = Router();

router.get("/", authController.GetUsers);
router.get("/search/:search", authController.SearchUsers);
router.get("/id/:id", authController.getUserById);
router.get("/name/:username", authController.getUserByName);
router.post("/register", authController.Register);
router.post("/login", authController.Login);
router.get("/logout", authController.Logout);
router.get("/refresh", authController.refresh);
router.put("/ban", authController.Ban);
router.get("/activate/:link", authController.activate);
router.get("/checkban", authController.checkBan);

export default router;
