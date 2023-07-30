import { Router } from "express";
import * as controller from '../controllers/carts.controller.js' 

const router = Router();

router.get('/', controller.getAll)
router.get('/:cid', controller.getById)
router.post('/:cid/product/:pid', controller.addProductToCartServices)

export default router