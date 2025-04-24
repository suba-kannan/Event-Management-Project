import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];


  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET!, (err, decodedUser) => {
      if (err) {
         res.status(403).json({ message: 'Invalid token' });
         return
      }
      
      next();
    });
  } else {
     res.status(401).json({ message: 'Authentication token not found.' });
     return
  }
};

