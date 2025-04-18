import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
      if (err) {
        res.status(403).json({ message: 'Invalid token' });
        return;
      }

      req.user = user;
      next();
    });
  } else {
     res.status(401).json({ message: 'Authentication token not found.' });
     return;
  }
};
export const authorizeRoles = (...roles: string[]) => {
   (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!roles.includes(user.role)) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }
    next();
  };
};