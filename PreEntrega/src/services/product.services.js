import ProductDaoMongo from "../daos/mongodb/product.dao.js";
const productDao = new ProductDaoMongo();


// import ProductDaoFs from "../daos/fileSystem/product.dao.js";
// const productDao = new ProductDaoFs()


export const getAll = async () => {

    try {
        const response = await productDao.getAll();
        return response
    } catch (error) {
        console.log(error)
    }

}

export const getAllProductsPag = async (options) => {
    try {
      const response = await productDao.getAllProductsPag(options);
  
      const result = {
        payload: response.docs,
        status: "success",
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevLink: response.hasPrevPage
          ? `http://localhost:8080/views/products?page=${response.prevPage}`
          : null,
        nextLink: response.hasNextPage
          ? `http://localhost:8080/views/products?page=${response.nextPage}`
          : null,
      };
  
      return result;
    } catch (error) {
      console.log(error);
    }
  };



export const getById = async (id) => {

    try {
const item = await productDao.getById(id)
if(!item) return false;
else return item;
    } catch (error) {
        console.log(error)
    }


}

export const create = async (obj) =>{
    try {
        const createdProduct = await productDao.create(obj);
        return createdProduct;
    } catch (error) {
        console.log(error);
    }
}



export const update = async (id, obj) => {

    try {
const item = await productDao.update(id, obj)
return item
    } catch (error) {
        console.log(error)
    }
}

export const remove = async (id) => {

    try {
const item = await productDao.remove(id)
return item
    } catch (error) {
        console.log(error)
    }

}


