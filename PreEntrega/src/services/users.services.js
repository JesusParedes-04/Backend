import usersDao from '../daos/mongodb/users.dao.js'

const userDao = new usersDao();

export const userRegister = async (user) => {
    try {
      const newUser = await userDao.userRegister(user);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const loginUser = async (user) => {
    try {
      const userExist = await userDao.loginUser(user);
      return userExist;
    } catch (error) {
      console.log(error);
    }
  };