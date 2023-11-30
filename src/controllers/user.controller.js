import UserService from "../services/user.services.js";
import { createResponse } from "../utils.js";
import Controller from "./class.controller.js";
import { sendEmailWithTemplate, sendEmailWithText } from "../services/email.services.js";
import { successfulRegisterTemplate } from "../templates/email.templates.js";
import { UserModel } from '../persistence/daos/mongodb/models/user.model.js'
import UserResDTO from '../persistence/DTOs/user.res.dto.js';

const userService = new UserService();
export default class UserController extends Controller {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const newUser = await userService.register(req.body);

      await sendEmailWithTemplate({
        email: newUser.email,
        subject: "Welcome!",
        html: successfulRegisterTemplate(newUser.first_name),
      });

      if (!newUser)
        createResponse(res, 400, { error: "User or password already exists" });
      else createResponse(res, 200, newUser);
    } catch (error) {
      next(error.message);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await userService.login(req.body);

      res.cookie("token", token, { httpOnly: true });
      createResponse(res, 200, { token });
    } catch (error) {
      next(error.message);
    }
  };

  registerFront = async (req, res, next) => {
    try {
      const newUser = await userService.register(req.body);

      await sendEmailWithTemplate({
        email: newUser.email,
        subject: "Welcome!",
        html: successfulRegisterTemplate(newUser.first_name),
      });

      if (!newUser) res.redirect("/error-register");
      else res.redirect("/login?registerSuccessful=true");
    } catch (error) {
      next(error.message);
    }
  };

  loginFront = async (req, res, next) => {
    try {
      const token = await userService.login(req.body);

      if (!token) return res.redirect("/error-login");

      res.cookie("token", token, { httpOnly: true });
      res.redirect("/products?loginSuccessful=true");
    } catch (error) {
      next(error.message);
    }
  };

  logout = (req, res) => {
    res.clearCookie("token");
  };

  logoutFront = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
  };


  getUsers = async (req, res) => {
    try {
      const users = await UserModel.find({}, 'first_name last_name email role');

      const formattedUsers = users.map(user => new UserResDTO(user));

      return res.status(200).json({ users: formattedUsers });
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  };

  inactiveUsers = async (req, res) => {
    try {
      // Calcular la fecha para la inactividad de 2 dias
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
      const inactiveUsers = await UserModel.find({}, 'email last_connection');
  
      // Filtrar los usuarios inactivos por más de 2 días
      const usersToDelete = inactiveUsers.filter(user => user.last_connection < twoDaysAgo);
  
      await Promise.all(
        usersToDelete.map(async (user) => {
          
          await UserModel.findByIdAndDelete(user._id);
  
          await sendEmailWithText({
            email: user.email,
            subject: 'Eliminación por inactividad',
            text: 'Tu cuenta ha sido eliminada debido a la inactividad durante los últimos 2 días.',
          });
        })
      );
  
      return res.status(200).json({ message: "Usuarios inactivos eliminados correctamente" });
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar usuarios inactivos' });
    }
  };
  
  deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      await UserModel.findByIdAndDelete(userId);
  
      // Redirigir a /profile si se elimina correctamente el usuario
      res.redirect(303, '/profile');
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  };
  
  modifyUserRole = async (req, res) => {
    try {
      const userId = req.params.id;
      const newRole = req.body.newRole;
  
      await UserModel.findByIdAndUpdate(userId, { role: newRole });
  
      // Redirigir a /profile si se modifica correctamente el rol del usuario
      res.redirect(303, '/profile');
    } catch (error) {
      return res.status(500).json({ error: 'Error al modificar el rol del usuario' });
    }
  };
}  




