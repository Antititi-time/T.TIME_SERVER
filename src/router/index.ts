import { Router } from 'express';
import teamRouter from './teamRouter';
import chatRouter from './chatRouter';

const router: Router = Router();

router.use('/team', teamRouter);
router.use('/chat', chatRouter);

export default router;
