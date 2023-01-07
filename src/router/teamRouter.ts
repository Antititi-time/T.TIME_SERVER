import { Router } from 'express';
import { body, param } from 'express-validator';
import { teamController } from '../controller';
import errorValidator from '../middleware/errorValidator';

const router: Router = Router();

router.post(
  '/',
  [
    body('teamName').notEmpty().isLength({ max: 14 }),
    body('teamMember').notEmpty(),
  ],
  errorValidator,
  teamController.makeTeam,
);
router.post(
  '/:teamId',
  [param('teamId').notEmpty()],
  errorValidator,
  teamController.participateTeam,
);
router.get(
  '/check/:teamId',
  [param('teamId').notEmpty()],
  errorValidator,
  teamController.checkTeamHappiness,
);

export default router;
