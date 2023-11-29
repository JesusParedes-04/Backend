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

// export const create = async (req, res, next) => {
//   try {
//     const product = req.body;
//     product.thumbnails = [req.file.filename];
//     product.status = product.status ?? true;
//     const newProduct = await service.create(product);

//     if (!newProduct) throw new Error("Product could not be created.");

//     res.status(201).json(newProduct);
//   } catch (error) {
//     next(error);
//   }
// };



export const create = async (req, res, next) => {
  try {
    const product = req.body;

    // Verificar si se adjuntó un archivo en la solicitud
    if (req.file && req.file.filename) {
      product.thumbnails = [req.file.filename];
    } else {
      // Manejar el caso en que no se adjunta ningún archivo
      product.thumbnails = []; // O cualquier otro valor por defecto
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


// export const remove = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const removedProduct = await service.delete(id);

//     // Aquí verificamos si el producto tiene un propietario y el propietario es premium
//     if (removedProduct.owner && removedProduct.owner.role === 'premium') {
//       // Enviamos el correo electrónico al propietario del producto
//       await sendEmailWithText({
//         email: removedProduct.owner.email,
//         subject: 'Producto eliminado',
//         text: 'El producto que poseías ha sido eliminado.',
//       });
//     }

//     res.json(removedProduct);
//   } catch (error) {
//     next(error.message);
//   }
// };


// export const remove = async (req, res) => {

//   try {
//     const productId = req.params.id;
//     const product = await ProductModel.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Producto no encontrado" });
//     }

//     const userId = product.product_owner; // Obtenemos el ID del propietario del producto

//     const user = await UserModel.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "Usuario no encontrado para este producto" });
//     }

//     // Verificar si el usuario es "premium" y enviar correo si lo es
//     if (user.role === "premium") {
//       const emailContent = {
//         email: user.email,
//         subject: 'Producto eliminado',
//         text: `Hola ${user.first_name}, lamentamos informarte que el producto ha sido eliminado.`,
//       };

//       // Utiliza tu método de envío de correo electrónico aquí
//       await sendEmailWithText(emailContent);
//     }

//     // Eliminar el producto
//     await ProductModel.findByIdAndRemove(productId);

//     return res.status(200).json({ message: "Producto eliminado con éxito" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Hubo un error al eliminar el producto" });
//   }
// }
  
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedProduct = await service.delete(id);

    if (removedProduct.owner) {
      const owner = removedProduct.owner;

      // Buscar en la base de datos el usuario por su ID y obtener su información completa
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
