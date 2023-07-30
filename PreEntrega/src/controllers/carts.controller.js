import * as cartService from "../services/carts.services.js";
import * as productService from "../services/product.services.js"; // Corregir el nombre de la función aquí

export const getAll = async (req, res, next) => {
  try {
    const response = await cartService.getCartsServices();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartsByIdServices(cid);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const cart = await cartService.createCartsServices();
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

export const addProductToCartServices = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;

    // Check if both cart and product exist
    const cart = await cartService.getCartsByIdServices(cid);
    const product = await productService.getById(pid); // Corregir aquí el nombre de la función

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add the product to the cart
    const updatedCart = await cartService.saveProductsToCartServices(cid, pid);

    res.status(201).json(updatedCart);
  } catch (error) {
    next(error);
  }
};
