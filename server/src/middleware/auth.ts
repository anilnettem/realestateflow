import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export type AuthRequest = Request & { user?: any };

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = (req.headers.authorization || '').split(' ');
  const token = auth[0] === 'Bearer' ? auth[1] : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
