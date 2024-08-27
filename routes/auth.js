import { Router } from 'express';
import { register,login,showLoginForm,showRegisterForm,userLogout } from "../controller/userController.js";

const router = Router();

//show page
router.get('/register',showRegisterForm);
router.get('/login', showLoginForm);

//submit action
router.post('/register',register);
router.post('/login',login);

//logout
router.get('/logout', userLogout);

export default router;