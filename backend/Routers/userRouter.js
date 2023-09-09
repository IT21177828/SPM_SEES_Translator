import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

// import { registerUser,loginUser, checkAge, adminAccount } from '../controller/userController.js';
import { registerUser, checkAge } from '../controllers/userController.js';

userRouter.post('/', registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/checkAge', checkAge);


userRouter.post('/refresh', userController.verify, userController.refresh);
userRouter.post('/showName', userController.verify, userController.showName);

// userRouter.post('/admin', adminAccount);

export default userRouter;