import { Router } from 'express';
import { body, param } from 'express-validator';
import { chatController } from '../controllers';
import errorValidator from '../middleware/error/errorValidator';

const router: Router = Router();

router.post(
  '/:userId',
  [
    param('userId').notEmpty(),
    body('questionType').notEmpty(),
    body('questionNumber').notEmpty(),
    body('answer').notEmpty().isLength({ max: 100 }),
    body('grade').notEmpty(),
    body('teamId').notEmpty(),
  ],
  errorValidator,
  chatController.chatAnswer,
);

export default router;