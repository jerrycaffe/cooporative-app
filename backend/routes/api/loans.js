import {loanRequest, adminViewAllLoans} from '../../controllers/loansCOntroller';
import {adminProtect, staffProtect} from '../../middleware/auth'
import {Router} from 'express';

const router = Router();
router.get('/all', adminProtect, adminViewAllLoans);
router.post('/request/:id', staffProtect, loanRequest);
export default router;