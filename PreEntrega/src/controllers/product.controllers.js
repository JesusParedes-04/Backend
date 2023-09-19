import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";

const prodService = new ProductService()
export default class ProductController extends Controllers{
    constructor(){
        super(prodService);
    }
}


// import { ProductModel } from "../daos/mongodb/models/product.model.js";
// import * as service from "../services/product.services.js"
// import {stringToBoolean} from "../utils.js"


// export const getAll = async (req, res, next) => {
//     try {
//       const { limit, page, sortOrder, category, available } = req.query;
  
//       const result = await service.getAllProductsPag({
//         limit,
//         page,
//         sortOrder,
//         category,
//         available: stringToBoolean(available),
//       });
  
//       res.status(200).json(result);
//     } catch (error) {
//       next(error);
//     }
//   };

// export const getById = async (req, res, next)=>{


// try {
//     const {id} = req.params;
//     const prod = await service.getById(id)
//     if(!prod) res.status(404).json ({msg: 'Product not found!'})
//     else res.json(prod)
// } catch (error) {
//     next (error.message)
// }

    
// }

// export const create = async (req, res) => {
//     try {
//         const productData = req.body;

//         const createdProduct = await ProductModel.create(productData);

//         res.status(201).json(createdProduct);
//     } catch (error) {
//         res.status(500).json({ error: "Error creating product" });
//     }
// }

// export const update = async (req, res, next)=>{
//     try {
//         const {id} = req.params;
//         const prodUpd = await service.update(id, req.body);
// res.json(prodUpd)
//     } catch (error) {
//         next(error.message)
//     }
// }

// export const remove = async (req, res, next)=>{
//     try {
//         const {id} = req.params;
//         const prodDel = await service.remove(id)
//         res.json(prodDel)
//     } catch (error) {
//         next(error.message)
//     }
// }