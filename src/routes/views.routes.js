import { Router } from "express";
import { optionalAuth } from "../middlewares/optionalAuth.js";
import * as controller from "../controllers/view.controller.js";
import authorize from "../middlewares/authorize.js";
import requireAuth from "../middlewares/requireAuth.js";
const router = Router();

router.get("/products", optionalAuth, controller.productsView);
router.get("/carts", optionalAuth, controller.cartView);
router.get("/register", controller.registerView);
router.get("/", controller.welcome);
router.get("/error-register", controller.errorRegisterView);
router.get("/login", controller.loginView);
router.get("/error-login", controller.errorLoginView);
router.get('/profile', requireAuth, authorize(["admin"]), controller.profile);
router.get('/checkout', requireAuth, authorize(["user","premium"]), controller.purchaseView);
router.get('/chat', requireAuth, authorize (["user","premium"]), controller.chat) 
// router.get('/realTimeProducts', controller.realTimeProducts) 


export default router;