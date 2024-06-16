import express from 'express';
import { userLogin, userRegister } from '../controllers/auth.controller.js';
import { addUser } from '../controllers/user.controller.js';
import { verifyUser } from '../middlewares/auth.middleware.js';




const router = express.Router();

router.route('/login').post(userLogin);
router.route('/register').post(userRegister);
router.route("/adduser").post(verifyUser,addUser)


export default router;
