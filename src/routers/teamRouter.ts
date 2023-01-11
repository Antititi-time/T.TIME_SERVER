import { Router } from 'express';
import { body, param } from 'express-validator';
import { teamController } from '../controllers';
import errorValidator from '../middleware/error/errorValidator';

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
router.get(
  '/:teamId',
  [param('teamId').notEmpty()],
  errorValidator,
  teamController.getTeamInfo,
);

export default router;
