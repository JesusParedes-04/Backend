import ProductServices from "../services/product.services.js";
import { stringToBoolean } from "../utils.js";
import { sendEmailWithText } from "../services/email.services.js";
import { UserModel } from "../persistence/daos/mongodb/models/user.model.js";
import { ProductModel } from "../persistence/daos/mongodb/models/product.model.js";

const service = new ProductServices();

export const getAll = async (req, res, next) => {
  try {
    const { limit, page, sortOrder, category, available } = req.query;

    const result = await service.getAllPaginated({
      limit,
      page,
      sortOrder,
      category,
      available: stringToBoolean(available),
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ mesagge: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};


export const create = async (req, res, next) => {
  try {
    const product = req.body;

    if (req.file && req.file.filename) {
      product.thumbnails = [req.file.filename];
    } else {
      
      product.thumbnails = []; 
    }

    product.status = product.status ?? true;
    const newProduct = await service.create(product);

    if (!newProduct) {
      throw new Error("Product could not be created.");
    }

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};



export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = req.body;

    if (req.file) {
      product.thumbnails = [req.file.filename];
    }

    const uptatedProduct = await service.update(id, product);

    res.json(uptatedProduct);
  } catch (error) {
    next(error.message);
  }
};


  
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedProduct = await service.delete(id);

    if (removedProduct.owner) {
      const owner = removedProduct.owner;

      const user = await UserModel.findById(owner.userId);

      // Verificar si el propietario es premium
      if (user && user.role === 'premium') {
        try {
          // Envía el correo electrónico al propietario del producto eliminado
          await sendEmailWithText({
            email: user.email,
            subject: 'Producto eliminado',
            text: 'El producto que poseías ha sido eliminado.',
          });
        } catch (emailError) {
          console.error('Error al enviar el correo electrónico:', emailError);
        }
      }
    }

    res.json(removedProduct);
  } catch (error) {
    next(error.message);
  }
};

export const getProdMock = async (req, res, next) => {
  try {
    const products = await service.getProdMock();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
