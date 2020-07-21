import {loanRequest} from '../../controllers/loansCOntroller';
import {adminProtect, staffProtect} from '../../middleware/auth'
import {Router} from 'express';

const router = Router();

router.post('/request', staffProtect, loanRequest);
export default router;