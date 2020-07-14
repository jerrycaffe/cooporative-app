import {addItems, viewOne, viewAll, adminViewAll, adminViewOne} from '../../controllers/itemsController';
import {adminProtect} from '../../middleware/auth'
import {Router} from 'express';

import parser from '../../config/cloudinaryConfig'

const router = Router();

router.get('/viewall', viewAll)
router.get('/viewone/:id', viewOne)

router.get('/admin/viewone/:id', adminProtect, adminViewOne)
router.get('/admin/viewall', adminProtect, adminViewAll)

router.post('/add', adminProtect, parser.single('image'), addItems)
export default router;