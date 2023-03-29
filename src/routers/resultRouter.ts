import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { resultController } from '../controllers';
import auth from '../middleware/auth';
import errorValidator from '../middleware/error/errorValidator';

const router: Router = Router();

router.get(
  '/team/score/:teamId',
  [param('teamId').isNumeric().notEmpty()],
  errorValidator,
  resultController.teamResultByType,
);
router.get(
  '/team/:teamId',
  [param('teamId').isNumeric().notEmpty()],
  errorValidator,
  resultController.getTeamResultType,
);
router.get(
  '/team/:teamId/detail',
  [
    param('teamId').isNumeric().notEmpty(),
    query('type').notEmpty().isIn(['a', 'b', 'c', 'd', 'e']),
  ],
  errorValidator,
  resultController.getTeamDetailResult,
);
router.patch(
  '/:teamId',
  [
    param('teamId').isNumeric().notEmpty(),
    body('isCompleted').isBoolean().notEmpty(),
  ],
  errorValidator,
  auth,
  resultController.checkUserHappiness,
);

router.get(
  '/:userId/:teamId',
  [
    param('userId').isString().notEmpty(),
    param('teamId').isNumeric().notEmpty(),
  ],
  errorValidator,
  resultController.userResult,
);

export default router;
