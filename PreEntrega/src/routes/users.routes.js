import { Router } from "express";
import * as controller from "../controllers/users.controller.js";

const router = Router();

router.post("/register", controller.userRegister);
router.post("/login", controller.loginUser);
router.get("/logout", controller.logoutUser);

export default router;