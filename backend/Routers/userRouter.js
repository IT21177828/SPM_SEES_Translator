import express from 'express';

const userRouter = express.Router();

// import { registerUser,loginUser, checkAge, adminAccount } from '../controller/userController.js';
import { registerUser,loginUser, checkAge } from '../controllers/userController.js';

userRouter.post('/', registerUser);
userRouter.get('/login', loginUser);
userRouter.get('/checkAge', checkAge);
// userRouter.post('/admin', adminAccount);

export default userRouter;