import express from 'express';
import userController from '../controllers/users';
import Validator from '../middlewares/Validator';
import Auth from '../middlewares/expressvalid';


const userRouter = express.Router();
// const { validSignup } = Auth;

// user sign up route
// userRouter.post('/users/auth/signup', userController.generateUser); //

// user can sign up route
// userRouter.post('/users/auth/signin', userController.loginUser);

// admin to verify user route
userRouter.post('/email/verify', userController.verifyUser); //


userRouter.post('/users/auth/signup', Auth.validSignup, userController.generateUser);

userRouter.post('/users/auth/signin', Validator.validateLogin, userController.loginUser);

export default userRouter;
