import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Event } from '../entities/Event';
import { User } from '../entities/User'; 
import { Repository } from 'typeorm';

const eventRepository: Repository<Event> = AppDataSource.getRepository(Event);
const userRepository: Repository<User> = AppDataSource.getRepository(User);

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, location, date, time, description, price, seatsAvailable, banner, organizerId } = req.body;

    const organizer = await userRepository.findOneBy({ id: organizerId });
    if (!organizer) {
       res.status(404).json({ message: 'Organizer not found' });
       return
    }

    const event = eventRepository.create({
      name,
      location,
      date,
      time,
      description,
      price: parseFloat(price),
      seatsAvailable: parseInt(seatsAvailable, 10),
      banner,
      organizer,
    });

    const savedEvent = await eventRepository.save(event);

     res.status(201).json({ message: 'Event created successfully', event: savedEvent });
     return
  } catch (error) {
    console.error('Error creating event:', error);
     res.status(500).json({ message: 'Failed to create event' });
     return
  }
};
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventRepository.find({
      relations: ['organizer'], 
      order: { date: 'ASC' }, 
    });

    res.status(200).json({ events });
  } catch (err) {
    console.error('Error fetching all events:', err);
    res.status(500).json({ message: 'Failed to fetch events', error: err });
  }
};

export const getOrganizerEvents = async (req: Request, res: Response) => {
  try {
    const organizerIdStr = req.params.organizerId; 
    const organizerId = parseInt(organizerIdStr, 10); 

    if (isNaN(organizerId)) {
       res.status(400).json({ message: 'Invalid organizer ID provided' });
       return
    }

    const organizer = await userRepository.findOneBy({ id: organizerId });
    if (!organizer) {
      res.status(404).json({ message: 'Organizer not found' });
      return;
    }

    const events = await eventRepository.find({
      where: { organizer: { id: organizerId } }, 
      order: { id: 'DESC' }, 
    });

    res.status(200).json({ events });
    return;
  } catch (error) {
    console.error('Error fetching organizer events:', error);
    res.status(500).json({ message: 'Failed to fetch organizer events' });
    return;
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.eventId, 10);
    const organizerIdFromQuery = req.body.organizerId;  
    const { name, location, date, time, description, price, seatsAvailable, banner } = req.body;

    if (isNaN(eventId)) {
       res.status(400).json({ message: 'Invalid event ID provided' });
       return;
    }

    const eventToUpdate = await eventRepository.findOne({
      where: { id: eventId },
      relations: ['organizer'],
    });

    if (!eventToUpdate) {
       res.status(404).json({ message: 'Event not found' });
       return;
    }

    if (eventToUpdate.organizer.id !== parseInt(organizerIdFromQuery as string, 10)) {
       res.status(403).json({ message: 'Unauthorized to update this event' });
       return;
    }

    if (name !== undefined) {
      eventToUpdate.name = name;
    }
    if (location !== undefined) {
      eventToUpdate.location = location;
    }
    if (date !== undefined) {
      eventToUpdate.date = date;
    }
    if (time !== undefined) {
      eventToUpdate.time = time;
    }
    if (description !== undefined) {
      eventToUpdate.description = description;
    }
    if (price !== undefined) {
      eventToUpdate.price = parseFloat(price);
    }
    if (seatsAvailable !== undefined) {
      eventToUpdate.seatsAvailable = parseInt(seatsAvailable as string, 10);
    }
    if (banner !== undefined) {
      eventToUpdate.banner = banner;
    }

    const updatedEvent = await eventRepository.save(eventToUpdate);

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    return
  } catch (error) {
    console.error('Error updating event:', error);
     res.status(500).json({ message: 'Failed to update event' });
     return;
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const eventToDelete = await eventRepository.findOne({
      where: { id: parseInt(eventId, 10) },
      relations: ['organizer'], 
    });

    if (!eventToDelete) {
       res.status(404).json({ message: 'Event not found' });
       return
    }

    const currentOrganizerId = req.body.organizerId; 

    if (eventToDelete.organizer.id !== parseInt(currentOrganizerId, 10)) {
       res.status(403).json({ message: 'Unauthorized to delete this event' });
       return
    }

    await eventRepository.remove(eventToDelete);

     res.status(200).json({ message: 'Event deleted successfully', eventId: parseInt(eventId, 10) });
     return
  } catch (error) {
    console.error('Error deleting event:', error);
     res.status(500).json({ message: 'Failed to delete event' });
     return
  }
};