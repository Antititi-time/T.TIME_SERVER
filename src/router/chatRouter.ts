import { Router } from 'express';
import { chatController } from '../controller';

const router: Router = Router();

router.post('/:userId', 
chatController.chatAnswer);

export default router;