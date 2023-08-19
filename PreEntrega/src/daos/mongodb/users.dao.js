import { UserModel } from "./models/user.model.js";

export default class UserDao {


  async userRegister(user) {
    try {

      const { email, password } = user;
      const userFound = await UserModel.findOne({ email });
      console.log("userFound", userFound);
      
      if (!userFound) {
        const isAdmin = email === "adminCoder@coder.com" && password === "adminCod3r123";
        const newUser = await UserModel.create({
          ...user,
          role: isAdmin ? "admin" : "user",
        });
        return newUser;
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(user) {

    try {
      const { email, password } = user;
      const validUser = await UserModel.findOne({ email, password });
      return validUser ? validUser : false;
    } catch (error) {
      console.log(error);
    }
  }
}