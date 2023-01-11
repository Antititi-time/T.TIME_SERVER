import { Router } from 'express';
import teamRouter from './teamRouter';
import chatRouter from './chatRouter';
import resultRouter from './resultRouter';

const router: Router = Router();

router.use('/team', teamRouter);
router.use('/chat', chatRouter);
router.use('/result', resultRouter);

export default router;
