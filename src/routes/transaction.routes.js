import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createPaymentLink,
  getAlltransaction,
} from "../controllers/transaction.controller.js";

const router = Router();

router.route("/get-transactions").get(verifyJWT, getAlltransaction);
router.route("/create-payment-link").post(verifyJWT, createPaymentLink);

export default router;
