import ProductService from "../services/product.services.js";
import * as cartService from "../services/cart.services.js";
import UserController from "../controllers/user.controller.js";
import * as cartController from '../controllers/cart.controller.js';
import UserService from "../services/user.services.js";
const userController = new UserController()
const productService = new ProductService();
import { UserModel } from "../persistence/daos/mongodb/models/user.model.js";
import { getAllMessages } from "../services/messages.services.js";
import ticketService from "../services/ticket.services.js";


export const welcome = (req, res) => {
res.render("home")
};

export const productsView = async (req, res) => {
  try {
    const { user } = req;
    const { page } = req.query;
    const {
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
    } = await productService.getAllPaginated({ page, limit: 2 });

    const plainProducts = products.map((product) => product.toObject());
    res.render("products", {
      ...(user && { user: user.toObject() }),
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
    res.render("error", { message: error, code: 500 });
  }
};

export const cartView = async (req, res) => {
  try {
    const { user } = req;
    const { _id } = user.cart;
    const cart = await cartService.getById(_id);
    const plainItems = cart.items.map((item) => ({
      ...item.toObject(),
      totalPrice: item.product.price * item.quantity,
    }));
    res.render("carts", {
      items: plainItems,
      id: cart._id,
      ...(user && { user: user.toObject() }),
    });
  } catch (error) {
    res.render("error", { message: error, code: 500 });
  }
};

export const registerView = (req, res) => {
  res.render("register");
};

export const errorRegisterView = (req, res) => {
  res.render("errorRegister");
};

export const loginView = (req, res) => {
  res.render("login");
};

export const errorLoginView = (req, res) => {
  res.render("errorLogin");
};


export const chat = async (req, res) => {

  try {
    const messages = await getAllMessages();
    res.render('chat', { title: 'Chat', messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const profile = async (req, res, next) => {
  try {

    const users = await UserModel.find({})
    const usersHB = users.map ( user => user.toObject() )
    res.render('profile', {users: usersHB} )

  } catch (error) {
    console.error('Error al obtener y mostrar los usuarios:', error);
    res.status(500).send('Error al obtener los usuarios');
  }
};


export const purchaseView = (req, res) => {
  res.render("checkout");
};


export const realTimeProducts = (req, res) => {
  res.render('realTimeProducts')
}