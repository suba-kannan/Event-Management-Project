import express from 'express';
import { Event } from '../entities/Event';
import {  createEvent,
  getOrganizerEvents,
  updateEvent,
  deleteEvent,
  getAllEvents } from '../controllers/event.controller'; 

const router = express.Router();

router.post('/organizer-dashboard', createEvent); 
router.get('/organizer-dashboard/:organizerId', getOrganizerEvents); 
router.delete('/organizer-dashboard/:eventId', deleteEvent); 
router.put('/organizer-dashboard/:eventId', updateEvent);
router.get('/all', getAllEvents);
export default router;