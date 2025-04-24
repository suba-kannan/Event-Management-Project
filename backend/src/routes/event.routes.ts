import express from 'express';
import {  createEvent,
  getOrganizerEvents,
  updateEvent,
  deleteEvent,
  getAllEvents } from '../controllers/event.controller'; 
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/organizer-dashboard', authenticateJWT, createEvent); 
router.get('/organizer-dashboard/:organizerId',authenticateJWT,  getOrganizerEvents); 
router.delete('/organizer-dashboard/:eventId',authenticateJWT, deleteEvent); 
router.put('/organizer-dashboard/:eventId',authenticateJWT, updateEvent);
router.get('/all', authenticateJWT, getAllEvents);
export default router;