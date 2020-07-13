import { Router } from "express";
import { addStaff, staffLogin } from "../../controllers/authStaffController";
import { adminProtect } from "../../middleware/auth";

const router = Router();

router.post("/add", adminProtect, addStaff);
router.post("/login", staffLogin);

export default router;
