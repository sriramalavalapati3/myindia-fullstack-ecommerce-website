import express, { Router } from 'express';
import { validateUser, validateLogin } from '../middleware/validation';
import { handleRegister, handleLogin } from '../controllers/controller';
import { loginLimiter } from '../middleware/rate-Limit';


const userRoute: Router = express.Router();


userRoute.post("/register", validateUser, handleRegister);

userRoute.post('/login', validateLogin, loginLimiter, handleLogin);

export { userRoute };
