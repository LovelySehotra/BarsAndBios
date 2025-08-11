// import { Request, Response } from 'express';
// import { UserService } from '../../application/services/UserService';
// import { CreateUserDto, UpdateUserDto, GetUsersQueryDto } from '../../application/dtos/user/user.dtos';

// export class UserController {
//     private userService: UserService;

//     constructor(userService: UserService) {
//         this.userService = userService;
//     }

//     // Create a new user
//     createUser = async (req: Request, res: Response) => {
//         try {
//             const userData: CreateUserDto = req.body;
//             const newUser = await this.userService.createUser(userData);
//             return res.status(201).json({
//                 success: true,
//                 data: newUser
//             });
//         } catch (error: any) {
//             const [status, message] = error.message.split('::');
//             return res.status(status || 500).json({
//                 success: false,
//                 error: message || 'Server error'
//             });
//         }
//     };

//     // Get user by ID
//     getUser = async (req: Request, res: Response) => {
//         try {
//             const { id } = req.params;
//             if (!id) {
//                 return res.status(400).json({
//                     success: false,
//                     error: 'User ID is required'
//                 });
//             }
//             const user = await this.userService.getUserById(id);
//             return res.status(200).json({
//                 success: true,
//                 data: user
//             });
//         } catch (error: any) {
//             const [status, message] = error.message.split('::');
//             const statusCode = status ? parseInt(status, 10) : 500;
//             return res.status(statusCode).json({
//                 success: false,
//                 error: message || 'Server error'
//             });
//         }
//     };

//     // Update user
//     updateUser = async (req: Request, res: Response) => {
//         try {
//             const { id } = req.params;
//             if (!id) {
//                 return res.status(400).json({
//                     success: false,
//                     error: 'User ID is required'
//                 });
//             }
//             const updateData: UpdateUserDto = req.body;
//             const updatedUser = await this.userService.updateUser(id, updateData);
//             return res.status(200).json({
//                 success: true,
//                 data: updatedUser
//             });
//         } catch (error: any) {
//             const [status, message] = error.message.split('::');
//             const statusCode = status ? parseInt(status, 10) : 500;
//             return res.status(statusCode).json({
//                 success: false,
//                 error: message || 'Server error'
//             });
//         }
//     };

//     // Delete user
//     deleteUser = async (req: Request, res: Response) => {
//         try {
//             const { id } = req.params;
//             if (!id) {
//                 return res.status(400).json({
//                     success: false,
//                     error: 'User ID is required'
//                 });
//             }
//             await this.userService.deleteUser(id);
//             return res.status(200).json({
//                 success: true,
//                 data: {}
//             });
//         } catch (error: any) {
//             const [status, message] = error.message.split('::');
//             const statusCode = status ? parseInt(status, 10) : 500;
//             return res.status(statusCode).json({
//                 success: false,
//                 error: message || 'Server error'
//             });
//         }
//     };

//     // Get all users with pagination and filtering
//     getUsers = async (req: Request, res: Response) => {
//         try {
//             const query: GetUsersQueryDto = req.query as any;
//             const result = await this.userService.getAllUsers(query);
//             return res.status(200).json({
//                 success: true,
//                 data: result.users,
//                 pagination: result.pagination
//             });
//         } catch (error: any) {
//             const [status, message] = error.message.split('::');
//             return res.status(status || 500).json({
//                 success: false,
//                 error: message || 'Server error'
//             });
//         }
//     };
// }
