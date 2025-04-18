import express from 'express';
import { createBooking,cancelBooking, getUserBookings } from '../controllers/booking.controller';

const router = express.Router();

router.post('/book', createBooking);
router.post('/cancel', cancelBooking);
router.get('/user/:userId', getUserBookings);

export default router;
