import fs from "fs";
import ProductManager from "./productManager.js";
const products = new ProductManager('./products.json');


export default class CartManager {
  constructor(path) {
    this.path = path;

  }

  async createCart() {
    try {
      const cartFile = await this.getCarts();
      const cart = {
        id: await this.#getMaxId() + 1,
        products: []
      }

      cartFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartFile));
      return cart
    } catch (error) {
      console.log(error);
    }
  };

  async #getMaxId() {
    try {
      const cartFile = await this.getCarts();
      let maxId = 0;
      cartFile.forEach(cart => {
        if (cart.id > maxId) maxId = cart.id;
      });
      return maxId;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, 'utf-8');
        const cartsjs = JSON.parse(carts);
        return cartsjs;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  async getCartById(id) {

    try {

      const cartFile = await this.getCarts()
      const idCart = cartFile.find(cart => cart.id === id);

      //Ver bien si es idcart o idcart.products
      if (idCart) return idCart
      else { return `ID ${cartId} does not exists` }
    }
    catch (error) {
      console.log(error)
    }
  }


  async saveProductsToCart(idCart, idProduct) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === idCart);
      if (!cart) {
        throw new Error(`Cart with ID ${idCart} not found`);
      }
  
      const product = await products.getProductById(idProduct);
      if (!product) {
        throw new Error(`Product with ID ${idProduct} not found`);
      }
  
      const existingProduct = cart.products.find((prod) => prod.id === idProduct);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({
          id: idProduct,
          quantity: 1,
        });
      }
  
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      console.error('Error saving products to cart:', error);
      throw error;
    }
  }
  
  }
