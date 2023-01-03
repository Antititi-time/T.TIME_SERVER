import { Router } from 'express';
import teamRouter from './teamRouter';

const router: Router = Router();

router.use('/team', teamRouter);

export default router;
