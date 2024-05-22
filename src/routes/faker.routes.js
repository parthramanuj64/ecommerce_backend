import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { generateData } from "../controllers/dummy.controller.js";

const router = Router();

router.route("/generate-data").post(verifyJWT, generateData);

export default router;
