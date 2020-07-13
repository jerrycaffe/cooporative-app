import { Router } from "express";
import {
  addStaff,
  staffLogin,
  adminViewAll,
  adminViewOne,
  adminViewBranch
} from "../../controllers/authStaffController";
import { adminProtect } from "../../middleware/auth";

const router = Router();

router.get("/admin/viewone/:id", adminProtect, adminViewOne);
router.get("/admin/viewall/branch", adminProtect, adminViewBranch);
router.get("/admin/viewall", adminProtect, adminViewAll);
router.post("/add", adminProtect, addStaff);
router.post("/login", staffLogin);

export default router;
