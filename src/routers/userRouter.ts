import { Router } from 'express';
import { body, param } from 'express-validator';
import { userController } from '../controllers';
import auth from '../middleware/auth';
import errorValidator from '../middleware/error/errorValidator';

const router: Router = Router();

router.post('/auth', [
  body('social').isString().notEmpty().isIn(['KAKAO', 'GOOGLE']),
  errorValidator,
  userController.getSocialUser,
]);

router.get('/myPage/:userId', userController.getMyPage);

export default router;
