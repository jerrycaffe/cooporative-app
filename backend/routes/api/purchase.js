import { adminProtect, staffProtect } from "../../middleware/auth";
import { Router } from "express";
import { makePurchase } from "../../controllers/purchaseController";

const router = Router();

router.post("/item/:itemId", staffProtect, makePurchase)
export default router;