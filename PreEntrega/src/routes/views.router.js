import { Router } from "express";
import ProductManager from "../managers/productManager.js";
const products = new ProductManager();

const router = Router();

router.get('/', async (req, res)=>{
    let allProducts = await products.getProducts()
    res.render('home', {
        title: "express avanzado",
        products : allProducts
    })
});

export default router