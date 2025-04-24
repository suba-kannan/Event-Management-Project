import { Request, Response } from 'express';
import { createBooking, cancelBooking, getUserBookings } from '../booking.controller';
import { AppDataSource } from '../../config/data-source';
import { sendBookingConfirmation, sendBookingCancellation } from '../emailService';

jest.mock('../../config/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

jest.mock('../emailService', () => ({
  sendBookingConfirmation: jest.fn(),
  sendBookingCancellation: jest.fn(),
}));

describe('Booking Controller', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnThis();
  const res = { status: mockStatus, json: mockJson } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createBooking', () => {
    it('should create a booking and send confirmation email', async () => {
      const mockUser = { id: 1, email: 'user@example.com' };
      const mockEvent = { id: 1, name: 'Event A', price: 100, seatsAvailable: 10 };
      const mockBooking = {};

      const userRepo = { findOne: jest.fn().mockResolvedValue(mockUser) };
      const eventRepo = {
        findOne: jest.fn().mockResolvedValue(mockEvent),
        save: jest.fn(),
      };
      const bookingRepo = {
        create: jest.fn().mockReturnValue(mockBooking),
        save: jest.fn(),
      };

      (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
        if (entity.name === 'User') return userRepo;
        if (entity.name === 'Event') return eventRepo;
        if (entity.name === 'Booking') return bookingRepo;
      });

      const req = {
        body: {
          userId: 1,
          eventId: 1,
          participants: 2,
        },
      } as Request;

      await createBooking(req, res);

      expect(eventRepo.save).toHaveBeenCalled();
      expect(bookingRepo.save).toHaveBeenCalledWith(mockBooking);
      expect(sendBookingConfirmation).toHaveBeenCalledWith(
        'user@example.com', 'Event A', 2, 200
      );
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Booking successful', booking: mockBooking });
    });
  });

  describe('cancelBooking', () => {
    it('should cancel a booking and update seats', async () => {
      const mockEvent = { id: 1, name: 'Event A', seatsAvailable: 5 };
      const mockUser = { id: 1, email: 'user@example.com' };
      const mockBooking = {
        user: mockUser,
        event: mockEvent,
        participants: 2,
      };

      const bookingRepo = {
        findOne: jest.fn().mockResolvedValue(mockBooking),
        remove: jest.fn(),
      };
      const eventRepo = { save: jest.fn() };

      (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
        if (entity.name === 'Booking') return bookingRepo;
        if (entity.name === 'Event') return eventRepo;
        return {};
      });

      const req = { body: { userId: 1, eventId: 1 } } as Request;

      await cancelBooking(req, res);

      expect(bookingRepo.remove).toHaveBeenCalledWith(mockBooking);
      expect(eventRepo.save).toHaveBeenCalled();
      expect(sendBookingCancellation).toHaveBeenCalledWith('user@example.com', 'Event A', 2);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Booking cancelled successfully' });
    });
  });

  describe('getUserBookings', () => {
    it('should return user bookings', async () => {
      const mockBookings = [{ id: 1, event: { name: 'Event A' } }];
      const bookingRepo = {
        find: jest.fn().mockResolvedValue(mockBookings),
      };

      (AppDataSource.getRepository as jest.Mock).mockImplementation(() => bookingRepo);

      const req = { params: { userId: '1' } } as unknown as Request;

      await getUserBookings(req, res);

      expect(bookingRepo.find).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith({ bookings: mockBookings });
    });
  });
});
