import { Router } from 'express';
import { body, param } from 'express-validator';
import { teamController } from '../controllers';
import auth from '../middleware/auth';
import errorValidator from '../middleware/error/errorValidator';

const router: Router = Router();

router.post(
  '/',
  [
    body('teamName').isString().notEmpty().isLength({ max: 14 }),
    body('teamMember').isNumeric().notEmpty(),
  ],
  errorValidator,
  auth,
  teamController.makeTeam,
);
router.post(
  '/:teamId',
  [param('teamId').notEmpty()],
  errorValidator,
  auth,
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
