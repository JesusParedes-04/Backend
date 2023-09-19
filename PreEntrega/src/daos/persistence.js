import ProductDaoMongo from "./mongodb/product.dao.js";
import UserDaoMongo from "./mongodb/users.dao.js";
import ProductFS from "./fileSystem/product.dao.js";
import { connectDB } from "../daos/mongodb/connection.js";
import 'dotenv/config'


let userDao;
let productDao;
let persistence = process.env.PERSISTENCE

switch (persistence) {
    case "file":
        console.log("entro a persistencia FileSystem")
        userDao="";
        productDao=new ProductFS()
        break;
    case "mongo":
        console.log("entro a persistencia Mongo")
        await connectDB()
        userDao=new UserDaoMongo();
        productDao=new ProductDaoMongo()
        break;
    default:
        userDao=new UserDaoMongo();
        productDao=new ProductDaoMongo()
       
}
export default{
    userDao,
    productDao
}