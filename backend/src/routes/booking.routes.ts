import express from 'express';
import { createBooking,cancelBooking, getUserBookings } from '../controllers/booking.controller';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/book', authenticateJWT,createBooking);
router.post('/cancel', authenticateJWT, cancelBooking);
router.get('/user/:userId',authenticateJWT, getUserBookings);

export default router;
