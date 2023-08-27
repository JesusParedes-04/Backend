import { createHash, isValidPassword } from "../../utils.js";
import { UserModel } from "./models/user.model.js";

export default class UserDao {


  async register(user) {
    try {

      const { email, password } = user;
      const userFound = await this.getByEmail(email);

      if (!userFound) {
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
          return await UserModel.create({
            ...user,
            password: createHash(password),
            role: isAdmin ? "admin" : "user",
          });
        }
        return await UserModel.create({
          ...user,
          password: createHash(password)
        })
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async login(user) {

    try {
      const { email, password } = user;
      const validUser = await this.getByEmail(email);
      if (validUser) {

        const passValid = isValidPassword(password, validUser)
        if (!passValid) return false;
        else return validUser;
      } else return false;
    }
    catch (error) {
      console.log(error);
    }
  }

  async getById(id) {

    try {
      const userExist = await UserModel.findById(id)
      if (userExist) return userExist
      else return false
      }
      catch (error) {
        console.log(error)
      }
    }

async getByEmail(email){

try{
  const userExist=await UserModel.findOne({email})
  if(userExist) return userExist
  else return false
} catch(error){
  console.log(error)
  throw new Error(error)
  }

}

}