import { Router } from 'express';
import teamRouter from './teamRouter';
import chatRouter from './chatRouter';
import resultRouter from './resultRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';

const router: Router = Router();

router.use('/team', teamRouter);
router.use('/chat', chatRouter);
router.use('/result', resultRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
