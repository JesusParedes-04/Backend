import * as cartService from "../services/carts.services.js";
import * as productService from "../services/product.services.js";

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
    const cart = await cartService.create();
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};


export const saveProductsToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params; 
    const newCart = await cartService.saveProductsToCart(cid, pid);
    res.status(200).json(newCart);
  } catch (error) {
    next(error);
  }
};

export const removeProdFromCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.removeProdFromCart(cid, pid);

    if (cart) {
      res.status(201).json(cart);
    } else {
      res.status(404).json({ mesagge: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCartItems = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { items } = req.body;
    const cart = await cartService.updateCartItems(cid, items);

    if (cart) {
      res.status(201).json(cart);
    } else {
      res.status(404).json({ mesagge: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};


export const updateQuantity = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await cartService.updateQuantity(
      cid,
      pid,
      Number(quantity)
    );

    if (cart) {
      res.status(201).json(cart);
    } else {
      res.status(404).json({ mesagge: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};


export const removeProducts = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.removeProducts(cid);

    if (cart) {
      res.status(201).json(cart);
    } else {
      res.status(404).json({ mesagge: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};



// export const deleteAllProductsFromCart = async (req, res) => {
//   try {
//     const cid = req.params.cid;
//     const updatedCart = await cartService.deleteAllProductsFromCart(cid);
//     res.json(updatedCart);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };



// export const updateCartItems = async (req, res, next) => {
//   try {
//     const { cid } = req.params;
//     const { items } = req.body;
//     const cart = await cartService.updateCartItems(cid, items);

//     if (cart) {
//       res.status(201).json(cart);
//     } else {
//       res.status(404).json({ mesagge: "Not found" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateQuantity = async (req, res, next) => {
//   try {
//     const { cid, pid } = req.params;
//     const { quantity } = req.body;
//     const cart = await cartService.updateQuantity(
//       cid,
//       pid,
//       Number(quantity)
//     );

//     if (cart) {
//       res.status(201).json(cart);
//     } else {
//       res.status(404).json({ mesagge: "Not found" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const removeProducts = async (req, res, next) => {
//   try {
//     const { cid } = req.params;
//     const response = await cartService.removeProducts(cid);
//     res.json(response);
// } catch (error) {
//     next(error)
// }
// };