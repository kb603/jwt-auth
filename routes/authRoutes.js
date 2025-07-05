import { Router } from "express";
import {
  getSignupRoute,
  postSignupRoute,
  getLoginRoute,
  postLoginRoute,
} from "../controllers/authController.js";

const router = Router();

router.get("/signup", getSignupRoute);
router.post("/signup", postSignupRoute);
router.get("/login", getLoginRoute);
router.post("/login", postLoginRoute);

export default router;
