import { Router } from "express";
import * as controller from '../controllers/carts.controller.js' 

const router = Router();

router.get('/', controller.getAll) 
router.get('/:cid', controller.getById) 
router.post("/", controller.create);
router.post('/:cid/product/:pid', controller.saveProductsToCart) 
router.delete('/:cid/products/:pid', controller.removeProdFromCart) 
router.delete('/:cid', controller.removeProducts) 
router.put("/:cid", controller.updateCartItems);
router.put("/:cid/product/:pid", controller.updateQuantity);


export default router