//En este espacio se configuran todos los endpoints de las views en handlebars. Renderizamos TODO.
//Configuración de ruta {{{body}}}

import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import {__dirname } from "../utils.js";
import { getAllMessages } from "../services/messages.services.js";
import * as productServices from "../services/product.services.js";
import * as cartServices from "../services/carts.services.js";
const products = new ProductManager('./products.json')

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


router.get('/chat', async (req, res) => {
  try {
    const message = await getAllMessages();
    res.render('chat', { title: 'Chat', message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Render cart y product

router.get('/products', async (req, res) => {
  try {
    const { user } = req.session;
    const { page } = req.query;
    const {
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
    } = await productServices.getAllProductsPag({ page, limit: 2 });

    const plainProducts = products.map((product) => product.toObject());

    res.render('products', {
      user,
      products: plainProducts,
      totalPages,
      currentPage,
      prevPage,
      nextPage,
      hasPrevPage,
      hasNextPage,
      prevLink: `/products?page=${prevPage}`,
      nextLink: `/products?page=${nextPage}`,
    });
  } catch (error) {
    res.render('error', { message: error, code: 500 });
  }
});

router.get('/carts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log({ id });
    const cart = await cartServices.getCartsByIdServices(id);
    const plainItems = cart.items.map((item) => ({
      ...item.toObject(),
      totalPrice: item.product.price * item.quantity,
    }));
    console.log(plainItems);
    res.render('carts', { items: plainItems, id: cart._id });
  } catch (error) {
    res.render('error', { message: error, code: 500 });
  }
});


//Render del registro y login


router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});


export default router