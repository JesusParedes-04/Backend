import MongoDao from "./mongo.dao.js";
import { ProductModel } from "./models/product.model.js";


export default class ProductDaoMongo extends MongoDao{
    constructor(){
        super(ProductModel);
    }
}

// import { ProductModel } from "./models/product.model.js";

// export default class ProductDaoMongo {



//     async getAll() {

//         try {

//             const response = await ProductModel.find({})
//             return response

//         } catch (error) {
//             console.log(error)
//         }


//     }

//     async getAllProductsPag({
//         limit = 10,
//         page = 1,
//         sortOrder = "asc",
//         category = null,
//         available = null,
//       } = {}) {
//         try {
//           const query = {
//             ...(category !== null && { category: { $eq: category } }),
//             ...(available !== null && {
//               stock: { ...(available ? { $gt: 0 } : { $eq: 0 }) },
//             }),
//           };
    
//           console.log(query);
    
//           const response = await ProductModel.paginate(query, {
//             page,
//             limit,
//             sort: { price: sortOrder },
//           });
    
//           return response;
//         } catch (error) {
//           console.log(error);
//         }
//       }


//     async getById(id) {


//         try {

//             const response = await ProductModel.findById(id)
//             return response;

//         } catch (error) {
//             console.log(error)
//         }

//     }
//     async create(obj) {
//       try {
//           const codeExists = await ProductModel.exists({ code: obj.code });
  
//           if (codeExists) {
//               throw new Error("Product with the same code already exists");
//           }
  
//           const newProduct = new ProductModel(obj);
//           const createdProduct = await newProduct.save();
//           return createdProduct;
//       } catch (error) {
//           console.log(error);
//           throw error; 
//       }
//   }

//     async update(id, obj) {
//         try {
//             const response = await ProductModel.findByIdAndUpdate(id, obj, { new: true })
//             return response
//         }

//         catch (error) {
//             console.log(error)
//         }
//     }
//     async remove(id) {
//         try {
//             const response = await ProductModel.findByIdAndDelete(id);
//             return response
//         } catch (error) {
//             console.log(error)
//         }
//     }



// }