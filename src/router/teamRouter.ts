import { Router } from 'express';
import { teamController } from '../controller';

const router: Router = Router();

router.post('/', teamController.makeTeam);
router.post('/:teamId', teamController.participateTeam);
router.get('/check/:teamId', teamController.checkTeamHappiness);

export default router;
