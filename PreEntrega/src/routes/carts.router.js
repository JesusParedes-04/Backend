import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const carts = new CartManager('./carts.json');

const router = Router();


router.post('/', async (req, res) => {
  try {
    const newCart = await carts.createCart();
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await carts.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const updatedCart = await carts.saveProductsToCart(cartId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

    export default router;