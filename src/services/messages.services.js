import MessageDaoMongo from "../daos/mongodb/messages.dao.js";
import Services from "./class.services.js";


const messageDao = new MessageDaoMongo()



export const getAllMessages = async () => {

    try {
        const response = await messageDao.getAll();
        return response
    } catch (error) {
        console.log(error)
    }

}

export const getByIdMessages = async (id) => {

    try {
const item = await messageDao.getById(id)
if(!item) return false;
else return item;
    } catch (error) {
        console.log(error)
    }


}

export const createMessages = async (obj) => {

    try {
const newProd = await messageDao.create(obj)
if(!newProd) return false;
else return newProd
    } catch (error) {
        console.log(error)
    }

}

export const updateMessages = async (id, obj) => {

    try {
const item = await messageDao.update(id, obj)
return item
    } catch (error) {
        console.log(error)
    }
}

export const removeMessages = async (id) => {

    try {
const item = await messageDao.remove(id)
return item
    } catch (error) {
        console.log(error)
    }

}