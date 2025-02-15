import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    res.locals.user = decoded;

    // req.user = decoded; // Attach the decoded user to the request object
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
}
