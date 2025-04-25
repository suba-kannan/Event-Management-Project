import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
     res.status(401).json({ message: 'Missing token' });
     return
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: number };

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: decoded.id });

    if (!user) {
       res.status(404).json({ message: 'User not found' });
       return
    }

     res.json({
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    });
  } catch {
     res.status(401).json({ message: 'Invalid token' });
     return
  }
};

export const editUserProfile = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
     res.status(401).json({ message: 'Missing token' });
     return
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: number };

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: decoded.id });

    if (!user) {
       res.status(404).json({ message: 'User not found' });
       return
    }

    user.name = req.body.name ?? user.name;
    user.phone = req.body.phone ?? user.phone;
    user.email = req.body.email ?? user.email;
    user.role = req.body.role ?? user.role;

    const updatedUser = await userRepository.save(user);

     res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
     res.status(500).json({ message: 'Something went wrong' });
     return
  }
};
