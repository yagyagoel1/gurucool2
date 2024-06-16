import express from 'express';
import { userLogin, userRegister } from '../controllers/auth.controller.js';
import { addUser } from '../controllers/user.controller.js';




const router = express.Router();

router.route('/login').post(userLogin);
router.route('/register').post(userRegister);
router.route("/adduser").post(addUser)


export default router;
