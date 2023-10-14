
//Importando CartModel de Mongoose:
import { CartsModel } from "./models/carts.model.js";
import { ProductModel } from "./models/product.model.js";

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
      const response = await CartsModel.findById(id).populate("items.product")
      return response;
    }
    catch (error) {
      console.log(error);
    }
  }


  async create() {
    try {
      const response = await CartsModel.create({ products: [] });
      return response;
    }
    catch (error) {
      console.log(error);
    }
  }

  async saveProductsToCart (cid, pid)  {
    try {
      const cart = await CartsModel.findById(cid);
  
      if (!cart) {
        throw new Error(`Cart with ID ${cid} not found`);
      }
  
      const product = await ProductModel.findById(pid); 
  
      if (!product) {
        throw new Error(`Product with ID ${pid} not found`);
      }
  
      const existingProduct = cart.items.find(
        (item) => item.product._id.toString() === pid
      );
  
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.items.push({
          product: pid,
          quantity: 1,
        });
      }
  
      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error saving products to cart:', error);
      throw error;
    }
  };


  async removeProdFromCart (cid, pid) {
    try {
      const cart = await CartsModel.findById(cid);
      cart.items = cart.items.filter(
        (item) => item.product._id.toString() !== pid
      );
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  };


  async updateCartItems  (cid, items) {
    try {
      const cart = await CartsModel.findById(cid);
      cart.items = items;
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  };


  async updateQuantity (cid, pid, quantity) {
    try {
      const cart = await CartsModel.findById(cid);
      const productInCart = cart.items.find(
        (item) => item.product._id.toString() === pid
      );
  
      if (productInCart) productInCart.quantity = quantity;
      else throw new Error("Product not found in cart");
  
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  async removeProducts (cid) {
    try {
      const cart = await CartsModel.findByIdAndUpdate(
        cid,
        { items: [] },
        { new: true }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

}
//   async deleteAllProductsFromCart(cid) {
//     try {
//       const cart = await CartsModel.findById(cid);
      
//       if (!cart) {
//         throw new Error(`Cart with ID ${cid} not found`);
//       }

//       cart.items = [];
//       await cart.save();
      
//       return cart;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   };
// }
  
