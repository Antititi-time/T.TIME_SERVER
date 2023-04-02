import { Router } from 'express';
import { body, param } from 'express-validator';
import { chatController } from '../controllers';
import auth from '../middleware/auth';
import errorValidator from '../middleware/error/errorValidator';

const router: Router = Router();

router.put(
  '/',
  [
    body('questionType').isString().notEmpty().isIn(['a', 'b', 'c', 'd', 'e']),
    body('questionNumber').isNumeric().notEmpty().isIn([1, 2]),
    body('answer').isString().notEmpty().isLength({ max: 100 }),
    body('grade').isNumeric().notEmpty().isIn([1, 2, 3, 4, 5]),
    body('teamId').isNumeric().notEmpty(),
  ],
  errorValidator,
  auth,
  chatController.chatAnswer,
);

export default router;
