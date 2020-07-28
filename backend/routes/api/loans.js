import {
  loanRequest,
  adminViewAllLoans,
  userViewLoanHistory
} from "../../controllers/loansCOntroller";
import { adminProtect, staffProtect } from "../../middleware/auth";
import { Router } from "express";

const router = Router();

router.get("/all", adminProtect, adminViewAllLoans);
router.get("/:id", staffProtect, userViewLoanHistory);
router.post("/request/:id", staffProtect, loanRequest);
export default router;
