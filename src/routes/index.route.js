import express from 'express';
import astrologerRouter from './astrologer.route.js';
import userRouter from './user.route.js';


const router = express.Router();

router.use('/astrologer', astrologerRouter);
router.use('/user', userRouter);


export default router;
