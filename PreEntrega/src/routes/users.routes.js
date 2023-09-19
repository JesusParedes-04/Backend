import { Router } from "express";
import UserController from "../controllers/users.controller.js";
import {checkAuth} from "../middlewares/auth.Jwt.js";
const controller = new UserController()


const router = Router();


router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile", checkAuth ,controller.profile);


export default router;



