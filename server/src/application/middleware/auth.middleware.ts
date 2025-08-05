import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../services/Auth/JwtService';
import { UserModel } from '../../domain/models/User';
import { Logger } from '../../config/logger';

export interface AuthRequest extends Request {
  user?: any;
}

export class AuthMiddleware {
  private jwtService: JwtService;
  private logger: Logger;

  constructor() {
    this.jwtService = new JwtService();
    this.logger = Logger.getInstance();
  }

  public protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const userId = this.jwtService.verifyToken(token);

        // Get user from the token
        req.user = await UserModel.findById(userId).select('-password');

        if (!req.user) {
          res.status(401).json({ success: false, error: 'User not found' });
          return;
        }

        next();
      } catch (error) {
        this.logger.error('Token verification failed:', error);
        res.status(401).json({ success: false, error: 'Not authorized, token failed' });
        return;
      }
    }

    if (!token) {
      res.status(401).json({ success: false, error: 'Not authorized, no token' });
      return;
    }
  };

  public authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({ success: false, error: 'Not authorized' });
        return;
      }

      if (!roles.includes(req.user.role)) {
        res.status(403).json({ 
          success: false, 
          error: `User role ${req.user.role} is not authorized to access this route` 
        });
        return;
      }

      next();
    };
  };
} 