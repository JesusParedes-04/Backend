import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

import bcrypt from "bcrypt";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ data });
};

// import {dirname} from 'path';   
// import { fileURLToPath } from 'url';
// import bcrypt from 'bcrypt'
// import MongoStore from 'connect-mongo'
// export const __dirname = dirname(fileURLToPath(import.meta.url))
// import { connectionString } from "./daos/mongodb/connection.js";

// //Metodos que vamos a usar de bcrypt

// /**
//  * 
//  * @param {*} password string
//  * @returns password hasheada -> string
//  * @example
//  * createHash('1234') 
//  */

// //Registro:
// export const hashPassword=(password)=>bcrypt.hashSync(password,bcrypt.genSaltSync(10))


// //Login:

// /**
//  * Método que compara password hasheada con password de login
//  * @param {*} user 
//  * @param {*} password 
//  * @returns boolean
//  */


// // export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
// export const isValidPassword=(user,password)=>bcrypt.compareSync(password,user.password)


// export const createResponse=(res,statusCode,data)=>{
//   return res.status(statusCode).json({data})
// }
// // !Primero recibe la contraseña el string plano y luego la hasheada

// export default __dirname


// export const stringToBoolean = (string) => {
//     if (string === "true") return true;
//     if (string === "false") return false;
//     return null;
//   };



// export  const mongoStoreOptions = {
//     store: MongoStore.create({
//       mongoUrl: connectionString,
//       // crypto: {
//       //   secret: "1234",
//       // },
//     }),
//     secret: "1234",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 60000,
//     },
//   };

