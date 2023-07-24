//En este espacio se configuran todos los endpoints de las views en handlebars
//Configuración de ruta {{{body}}}

import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import {__dirname } from "../utils.js";
const products = new ProductManager('./products.json');

const router = Router();

router.get('/home', async (req, res)=>{

try {
    
 const allProducts = await products.getProducts()
    res.render('home', {
        title: "express avanzado",
        allProducts : allProducts
    })


} catch (error) {

    res.status(500).json({ message: error.message });

    
}

})

router.get('/realtimeproducts', async (req, res) => {
  try {
    const allProducts = await products.getProducts();
    res.render('realtimeproducts', {
      title: "Productos en tiempo real",
      allProducts: allProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router