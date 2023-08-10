import cartsDaoMongo from "../daos/mongodb/carts.dao.js";
import ProductDaoMongo from "../daos/mongodb/product.dao.js";

const cartDao = new cartsDaoMongo();
const productDao = new ProductDaoMongo();

export const getCartsServices = async () => {

    try {
        const response = await cartDao.getAll();
        return response
    } catch (error) {
        console.log(error)
    }

}

export const create = async () => {
  try {
    const newCart = await cartDao.create();
    return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const getCartsByIdServices = async (id) => {
    try {
      const cart = await cartDao.getById(id);
      return cart;
    } catch (error) {
      console.log(error);
    }
  };


  export const saveProductsToCart = async (cid, pid) => {
    try {
      const newCart = await cartDao.saveProductsToCart(cid, pid);
      return newCart;
    } catch (error) {
      console.log(error);
    }
  };

  export const removeProdFromCart = async (cid, pid) => {
    try {
      const cart = await cartDao.getById(cid);
      const product = await productDao.getById(pid);
  
      if (!product) throw new Error("Product not found");
      if (!cart) throw new Error("Cart not found");
  
      const updatedCart = await cartDao.removeProdFromCart(cid, pid);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };

  export async function updateCartWithProducts(cartId, productsArray) {
    try {
      const updatedCart = await cartDao.updateProductsInCart(cartId, productsArray);
      return updatedCart;
    } catch (error) {
      console.error('Error updating cart with products:', error);
      throw error;
    }
  }


  export const updateCartItems = async (cid, items) => {
    try {
     //Validacion productos del cart

      const products = await productDao.getAll();
      const productsIds = products.map((product) => product._id.toString());
      const itemsIds = items.map((item) => item.product.toString());
      const productsExist = itemsIds.every((cid) => productsIds.includes(cid));
      if (!productsExist) throw new Error("Product not found");
  
   //Validacion items
      const itemsFormat = items.every(
        (item) => item.product && item.quantity >= 0
      );
      if (!itemsFormat) throw new Error("Invalid items format");
  
      const updatedCart = await cartDao.updateCartItems(cid, items);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };


  export const updateQuantity = async (cid, pid, quantity) => {
    try {
      const cart = await cartDao.getById(cid);
      const product = await productDao.getById(pid);
  
      if (!product) throw new Error("Product not founded");
      if (!cart) throw new Error("Cart not founded");
  
      const updatedCart = await cartDao.updateQuantity(
        cid,
        pid,
        quantity
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };


  export const removeProducts = async (cid) => {
    try {
      const cart = await cartDao.getById(cid);
  
      if (!cart) throw new Error("Cart not found");
  
      const updatedCart = await cartDao.removeProducts(cid);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };

  