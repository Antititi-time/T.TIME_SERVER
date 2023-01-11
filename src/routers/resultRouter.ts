import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { resultController } from '../controllers';
import errorValidator from '../middleware/error/errorValidator';

const router: Router = Router();

router.get(
  '/:userId',
  [param('userId').notEmpty()],
  errorValidator,
  resultController.userResult,
);
router.get(
  '/team/score/:teamId',
  [param('teamId').notEmpty()],
  errorValidator,
  resultController.teamResultByType,
);
router.get(
  '/team/:teamId',
  [param('teamId').notEmpty()],
  errorValidator,
  resultController.getTeamResultType,
);
router.get(
  '/team/:teamId/detail',
  [param('teamId').notEmpty(), query('type').notEmpty()],
  errorValidator,
  resultController.getTeamDetailResult,
);
router.patch(
  '/:userId',
  [param('userId').notEmpty(), body('isCompleted').notEmpty()],
  errorValidator,
  resultController.checkUserHappiness,
);

export default router;
