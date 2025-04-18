import { Router } from 'express';
import { getUserProfileEvents } from '../controllers/profile.controller';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.get('/manage', authenticateJWT, getUserProfileEvents);

export default router;