//src/controllers/profile.controllers.ts
import { Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Event } from '../entities/Event';
import { AuthRequest } from '../middleware/authMiddleware';

export const getUserProfileEvents = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

  if (userRole === 'Organizer') {
      const createdEvents = await AppDataSource.getRepository(Event).find({
        where: {
          organizer: {
            id: userId,
          },
        },
        relations: ['organizer'],
      });
      console.log('Created Events Count:', createdEvents);
      res.json({ createdEvents });
      console.log('Created Events Count:', createdEvents);

      return;

    } else {
      res.status(403).json({ message: 'Unauthorized role' });
      return;
    }
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};