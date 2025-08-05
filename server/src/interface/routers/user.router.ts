import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { UserController } from '../controllers/user.controller';
import { AuthMiddleware } from '../../application/middleware/auth.middleware';

export class UserRouter {
  private router: Router;
  private userController: UserController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Register route
    this.router.post('/register', [
      body('username')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Username must be between 3 and 50 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores'),
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
      body('firstName')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('First name must be between 1 and 50 characters'),
      body('lastName')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Last name must be between 1 and 50 characters'),
    ], this.validateRequest, this.userController.register);

    // Login route
    this.router.post('/login', [
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
      body('password')
        .notEmpty()
        .withMessage('Password is required'),
    ], this.validateRequest, this.userController.login);

    // Get current user route (protected)
    this.router.get('/me', this.authMiddleware.protect, this.userController.getCurrentUser);

    // Update profile route (protected)
    this.router.put('/profile', this.authMiddleware.protect, [
      body('firstName')
        .optional()
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('First name must be between 1 and 50 characters'),
      body('lastName')
        .optional()
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Last name must be between 1 and 50 characters'),
      body('bio')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Bio cannot be more than 500 characters'),
    ], this.validateRequest, this.userController.updateProfile);

    // Change password route (protected)
    this.router.put('/password', this.authMiddleware.protect, [
      body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
      body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number'),
    ], this.validateRequest, this.userController.changePassword);

    // Forgot password route
    this.router.post('/forgot-password', [
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    ], this.validateRequest, this.userController.forgotPassword);

    // Reset password route
    this.router.put('/reset-password/:resetToken', [
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    ], this.validateRequest, this.userController.resetPassword);
  }

  private validateRequest = (req: any, res: any, next: any): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }
    next();
  };

  public getRouter(): Router {
    return this.router;
  }
} 