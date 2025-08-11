import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../../application/services/UserService';
import { IUser } from '../../domain/models/User';

type UserRole = IUser['role'];  // 'user' | 'reviewer' | 'admin'

// TODO: Replace these with actual middleware imports when available
const authenticate = (req: any, res: any, next: any) => next();
// Using string literals directly since we can't use the UserRole type as a value
const authorize = (roles: ('user' | 'reviewer' | 'admin')[]) => (req: any, res: any, next: any) => next();

// Initialize services and controller
const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

// Public routes
router.post('/', userController.createUser);

// Protected routes (require authentication)
router.use(authenticate);

// User profile routes
router.get('/me', userController.getUser);
router.put('/me', userController.updateUser);
router.delete('/me', userController.deleteUser);

// Admin routes (require admin role)
router.use(authorize(['admin']));

// Admin user management routes
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
