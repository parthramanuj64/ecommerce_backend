import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllcustomer } from "../controllers/customer.controller.js";

const router = Router();

router.route("/get-customers").get(verifyJWT, getAllcustomer);

export default router;
