import { adminProtect, staffProtect } from "../../middleware/auth";
import { Router } from "express";
import {
  makePurchase,
  adminViewAllPurchase,
  userViewOnePurchase,
  adminViewOnePurchase,
  userViewAllPurchase,
  adminViewAllPurchaseRequest,
  adminRespondToPurchase
} from "../../controllers/purchaseController";

const router = Router();

router.post("/item/:itemId", staffProtect, makePurchase);
router.get("/all", adminProtect, adminViewAllPurchase);
router.get("/view/:id", staffProtect, userViewOnePurchase);
router.get("/view/:itemId/:id", adminProtect, adminViewOnePurchase);
router.get("/user/view/all", staffProtect, userViewAllPurchase);
router.get("/view/all/request", adminProtect, adminViewAllPurchaseRequest);
router.patch(
  "/respond/:purchase_id",
  adminProtect,
  adminRespondToPurchase
);

export default router;
