import {uploadSavings} from '../../controllers/savingsController';
import {adminProtect, staffProtect} from '../../middleware/auth'
import {Router} from 'express';

const router = Router();

router.post('/upload/:staff_id', adminProtect, uploadSavings);
export default router;