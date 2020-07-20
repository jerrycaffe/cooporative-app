import { Router } from "express";
import {
  addStaff,
  staffLogin,
  adminViewAll,
  adminViewOne,
  adminViewBranch,
  staffProfile,
  staffUpdateProfile
} from "../../controllers/authStaffController";
import parser from '../../config/cloudinaryConfig';
import { adminProtect, staffProtect } from "../../middleware/auth";

const router = Router();

router.get("/admin/viewone/:id", adminProtect, adminViewOne);
router.get("/admin/viewall/branch", adminProtect, adminViewBranch);
router.get("/admin/viewall", adminProtect, adminViewAll);
router.get("/profile/:id", staffProtect, staffProfile)
router.patch('/update/:id', staffProtect, parser.single('image'),staffUpdateProfile)
router.post("/add", adminProtect, addStaff);
router.post("/login", staffLogin);

export default router;
