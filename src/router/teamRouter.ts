import { Router } from 'express';
import { teamController } from '../controller';

const router: Router = Router();

router.post('/', teamController.makeTeam)
router.post('/:teamcode', teamController.participateTeam);

export default router;
