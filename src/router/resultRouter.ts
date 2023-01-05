import { Router } from 'express';
import { resultController } from '../controller';

const router: Router = Router();

router.get('/:userId', resultController.userResult);

export default router;