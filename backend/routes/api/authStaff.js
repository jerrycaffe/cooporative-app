import { Router } from "express";
import {
  addStaff,
  staffLogin,
  adminViewAll,
  adminViewOne,
  adminViewBranch,
  staffProfile
} from "../../controllers/authStaffController";
import { adminProtect, staffProtect } from "../../middleware/auth";

const router = Router();

router.get("/admin/viewone/:id", adminProtect, adminViewOne);
router.get("/admin/viewall/branch", adminProtect, adminViewBranch);
router.get("/admin/viewall", adminProtect, adminViewAll);
router.get("/profile/:id", staffProtect, staffProfile)
router.post("/add", adminProtect, addStaff);
router.post("/login", staffLogin);

export default router;
