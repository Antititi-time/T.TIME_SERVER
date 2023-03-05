import { Router } from 'express';
import { tokenController } from '../controllers';

const router: Router = Router();

router.use('/token', tokenController.getValidAccessToken);
export default router;
