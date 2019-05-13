import express from 'express';
import userController from '../controllers/users';


const router = express.Router();

// user sign up route
router.post('/signup', userController.generateUser);

// user can sign up route
router.post('/signin', userController.loginUser);

// admin to verify user route
router.post('/email/verify', userController.verifyUser);


module.exports = router;
