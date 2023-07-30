
//Importando CartModel de Mongoose:
import { CartsModel } from "./models/carts.model.js";

export default class CartDaoMongo {


  async getAll() {

    try {
      const response = await CartsModel.find()
      return response
    }

    catch (error) {
      console.log(error)
    }
  }



  async getById(id) {

    try {
      const response = await CartsModel.findById(id);
      return response;
    }
    catch (error) {
      console.log(error);
    }
  }


  async create(cart) {
    try {
      const response = await CartsModel.create({ products: [] });
      return response;
    }
    catch (error) {
      console.log(error);
    }
  }


  async saveProductsToCart(idCart, idProduct) {
    try {
      const cart = await CartsModel.findById(idCart);
      if (!cart) {
        throw new Error(`Cart with ID ${idCart} not found`);
      }


      // Obtener el producto por su ID
      const product = await productDao.getById(idProduct);
      if (!product) {
        throw new Error(`Product with ID ${idProduct} not found`);
      }

      const existingProduct = cart.products.find((prod) => prod.prodId.toString() === idProduct);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({
          prodId: idProduct,
          quantity: 1,
        });
      }
      // Guarda el carrito actualizado en la base de datos
      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error saving products to cart:', error);
      throw error;
    }
  }


}
