import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Booking } from '../entities/Booking';
import { Event } from '../entities/Event';
import { User } from '../entities/User';

export const createBooking = async (req: Request, res: Response) => {
  const { userId, eventId, participants } = req.body;
  console.log("User id",userId);
  console.log("event id",eventId);
  
  const userRepo = AppDataSource.getRepository(User);
    const eventRepo = AppDataSource.getRepository(Event);
    const bookingRepo = AppDataSource.getRepository(Booking);

  const user = await userRepo.findOne({where:{id:userId}});
  const event = await eventRepo.findOne({where:{id:eventId}});

  if (!user || !event) {
     res.status(404).json({ message: 'User or Event not found' });
     return
  }

  if (event.availableSeats < participants) {
     res.status(400).json({ message: 'Not enough seats available' });
     return
  }

  const totalPrice = event.price * participants;

  event.availableSeats -= participants;
  await eventRepo.save(event);

  const booking = bookingRepo.create({
    user: user,
    event: event,
    participants: participants,
    totalPrice: totalPrice,
  });

  await bookingRepo.save(booking);

  res.status(201).json({ message: 'Booking successful', booking });
};

export const cancelBooking = async (req: Request, res: Response) => {
  const { userId, eventId } = req.body;

  try {
    const bookingRepo = AppDataSource.getRepository(Booking);
    const eventRepo = AppDataSource.getRepository(Event);

    const booking = await bookingRepo.findOne({
      where: { user: { id: userId }, event: { id: eventId } },
      relations: ['event'],
    });

    if (!booking) {
       res.status(404).json({ message: 'Booking not found' });
       return
    }

    const participants = booking.participants;

    await bookingRepo.remove(booking);

    booking.event.availableSeats += participants;
    await eventRepo.save(booking.event);

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const bookings = await AppDataSource.getRepository(Booking).find({
      where: { user: { id: Number(userId) } },
      relations: ['event'],
    });
    res.json({ bookings });
  } catch (error) {
    console.error('Fetch user bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

