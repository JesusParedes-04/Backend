import ProductDaoMongo from "../daos/mongodb/product.dao.js";
const productDao = new ProductDaoMongo();


// import ProductDaoFs from "../daos/fileSystem/product.dao.js";
// const productDao = new ProductDaoFs()


export const getAll = async () => {

    try {
        const response = await productDao.getProducts();
        return response
    } catch (error) {
        console.log(error)
    }


}

export const getById = async (id) => {

    try {
const item = await productDao.getProductById(id)
if(!item) return false;
else return item;
    } catch (error) {
        console.log(error)
    }


}


export const create = async (obj) => {

    try {
const newProd = await productDao.addProduct(obj)
if(!newProd) return false;
else return newProd
    } catch (error) {
        console.log(error)
    }


}

export const update = async (id, obj) => {

    try {
const item = await productDao.updateProduct(id, obj)
return item
    } catch (error) {
        console.log(error)
    }


}

export const remove = async (id) => {

    try {
const item = await productDao.deleteProduct(id)
return item
    } catch (error) {
        console.log(error)
    }


}