import { Router } from 'express';
import { teamController } from '../controller';

const router: Router = Router();

router.post('/', teamController.makeTeam);
router.post('/:teamCode', teamController.participateTeam);
router.get('/check/:teamCode', teamController.checkTeamHappiness);

export default router;
