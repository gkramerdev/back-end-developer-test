import { Router } from 'express';
import UserController from '../../../application/controllers/user.controller';
import AuthController from '../../../application/controllers/auth.controller';

const userRouter = Router();

userRouter.post('/users', UserController.createUser.bind(UserController));
userRouter.get('/users', UserController.getAllUser.bind(UserController));
userRouter.get('/users/:email', UserController.getUserByEmail.bind(UserController));
userRouter.put('/users/:id', UserController.updateUser.bind(UserController));
userRouter.delete('/users/:id', UserController.deleteUser.bind(UserController));
userRouter.post('/login', AuthController.login.bind(AuthController));

export default userRouter;
