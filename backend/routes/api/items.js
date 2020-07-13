import {addItems} from '../../controllers/itemsController';
import {adminProtect} from '../../middleware/auth'
import {Router} from 'express';

import parser from '../../config/cloudinaryConfig'

const router = Router();
router.post('/add', adminProtect, parser.single('image'), addItems)
export default router;