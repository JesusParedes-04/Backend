import { Router } from "express";
import { optionalAuth } from "../middlewares/optionalAuth.js";
import * as controller from "../controllers/view.controller.js";
import { getAllMessages } from "../services/messages.services.js";
import authorize from "../middlewares/authorize.js";
const router = Router();

router.get("/products", optionalAuth, controller.productsView);
router.get("/carts", optionalAuth, controller.cartView);
router.get("/register", controller.registerView);
router.get("/error-register", controller.errorRegisterView);
router.get("/login", controller.loginView);
router.get("/error-login", controller.errorLoginView);
router.get('/profile', authorize, controller.profile);
router.get('/chat', async (req, res) => {
    try {
      const message = await getAllMessages();
      res.render('chat', { title: 'Chat', message });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;