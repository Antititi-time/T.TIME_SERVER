import { Router } from 'express';
import { teamController } from '../controller';

const router: Router = Router();

router.post('/', teamController.makeTeam);

export default router;
