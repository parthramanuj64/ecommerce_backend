import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllproduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/get-product").get(verifyJWT, getAllproduct);

export default router;
