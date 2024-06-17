import express from 'express';
import astrologerRouter from './astrologer.route.js';
import userRouter from './user.route.js';
import adminRouter from './admin.route.js';

const router = express.Router();

router.use('/astrologer', astrologerRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);

export default router;
