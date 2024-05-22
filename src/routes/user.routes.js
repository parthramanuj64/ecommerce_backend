import { Router } from "express";
import {
  loginuser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginuser);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
