import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";
import { profile } from "../controllers/view.controller.js";
const controller = new UserController();
import '../passport/github-strategy.js';
import passport from "passport";
const router = Router();


router.get("/", controller.getAll)
router.post("/register", controller.register);
router.post("/register-front", controller.registerFront);
router.post("/login", controller.login);
router.post("/login-front", controller.loginFront);
router.get("/logout", controller.logout);
router.get("/logout-front", controller.logoutFront);
router.delete("/", controller.inactiveUsers)
// router.post("/:id/modify-role", controller.modifyUserRole);
router.post("/:id/delete", controller.deleteUser);

// router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));

// router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => res.send('profile-github'))

export default router;