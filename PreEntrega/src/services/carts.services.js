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

export const getCartsByIdServices = async (id) => {
    try {
      const cart = await cartDao.getById(id);
      return cart;
    } catch (error) {
      console.log(error);
    }
  };



export const saveProductsToCartServices = async (cartId, productId) => { 
  try {
    const cart = await cartDao.getById(cartId); 
    if (!cart) {
      throw new Error(`Cart with ID ${cartId} not found`);
    }

    const product = await productDao.getById(productId); 
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    const existingProduct = cart.products.find(
      (prod) => prod.prodId.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({
        prodId: productId,
        quantity: 1,
      });
    }

    await cart.save();
    return cart;
  } catch (error) {
    console.error("Error saving products to cart:", error);
    throw error;
  }
};



// export const createCartsServices = async (obj) => {

//     try {
// const newProd = await cartDao.create(obj)
// if(!newProd) return false;
// else return newProd
//     } catch (error) {
//         console.log(error)
//     }

// }

