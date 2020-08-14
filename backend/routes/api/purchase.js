import { adminProtect, staffProtect } from "../../middleware/auth";
import { Router } from "express";
import { makePurchase, adminViewAllPurchase, userViewOnePurchase } from "../../controllers/purchaseController";

const router = Router();

router.post("/item/:itemId", staffProtect, makePurchase);
router.get("/all", adminProtect, adminViewAllPurchase);
router.get("/view/:id", staffProtect, userViewOnePurchase)

export default router;