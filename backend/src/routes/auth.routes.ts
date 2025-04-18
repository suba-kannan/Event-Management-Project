import { Router } from 'express';
import cors from 'cors';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

router.use(cors({ origin: "http://localhost:5173", credentials: true }));

router.post('/signup', authController.register);
router.post('/login', authController.login);

export default router;

