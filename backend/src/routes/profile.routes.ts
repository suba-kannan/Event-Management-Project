
import { Router } from 'express';
import { editUserProfile, getUserProfile } from '../controllers/profile.controller';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.get('/profile', authenticateJWT, getUserProfile);
router.put('/profile', authenticateJWT, editUserProfile);

export default router;
