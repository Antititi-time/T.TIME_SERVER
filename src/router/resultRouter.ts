import { Router } from 'express';
import { resultController } from '../controller';

const router: Router = Router();

router.get('/:userId', resultController.userResult);
router.get('/team/score/:teamId', resultController.teamResultByType);
router.get('/team/:teamId', resultController.getTeamResultType);

export default router;
