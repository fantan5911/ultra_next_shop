import { Router } from "express";
import authController from "../controllers/auth/auth.controller";

const router = Router();

router.get('/', authController.GetUsers);
router.get('/id/:id', authController.getUserById);
router.get('/name/:username', authController.getUserByName);
router.get('/auth/me', authController.checkAuth);
router.post('/register', authController.Register);
router.post('/login', authController.Login);
router.post('/logout', authController.Logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.put('/ban', authController.Ban)



export default router;