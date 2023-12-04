import { v4 as uuidv4 } from "uuid";
import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";

const { ticketDao, productDao, cartDao } = factory;

export default class TicketService extends Services {
  constructor() {
    super(ticketDao);
  }

  async generateTicket(user, cartId) {
    try {
      const cart = await cartDao.getById(cartId);

      if (!cart) {
        throw new Error('Cart not found');
      }
      const cartItems = cart.items;

      let totalAmount = 0;

      const detailedItems = await Promise.all(cartItems.map(async (item) => {
        const product = await productDao.getById(item.product);

        if (!product) {
          throw new Error(`Product with ID ${item.product} not found`);
        }

        if (item.quantity > product.stock) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        const subtotal = product.price * item.quantity;

        // Restar la cantidad comprada del stock disponible
        product.stock -= item.quantity;
        await product.save();

        totalAmount += subtotal;

        return {
          product: item.product,
          quantity: item.quantity,
          subtotal,
        };
      }));

      const ticketCode = uuidv4();

      const ticketData = {
        code: ticketCode,
        purchase_datetime: new Date().toISOString(),
        amount: totalAmount,
        purchaser: user.email, 
        items: detailedItems,
      };

      const createdTicket = await ticketDao.create(ticketData);

      return createdTicket;
    } catch (error) {
      console.log(error);
      throw new Error('Error generating ticket');
    }
  }
}

