import Services from "./class.services.js";

// import ProductDaoMongo from "../daos/mongodb/product.dao.js";
// const prodDao = new ProductDaoMongo();

import ProductDaoFS from "../daos/fileSystem/product.dao.js";
const prodDao = new ProductDaoFS();

export default class ProductService extends Services {
    constructor() {
        super(prodDao);
    }
};
// import ProductDaoMongo from "../daos/mongodb/product.dao.js";
// const productDao = new ProductDaoMongo();

