import {dirname} from 'path';   
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url))
import { connectionString } from "./daos/mongodb/connection.js";

//Metodos que vamos a usar de bcrypt
import bcrypt, { hashSync } from 'bcrypt'

/**
 * 
 * @param {*} password string
 * @returns password hasheada -> string
 * @example
 * createHash('1234') 
 */

//Registro:
export const createHash = (password) => hashSync(password, bcrypt.genSaltSync(10))


//Login:

/**
 * Método que compara password hasheada con password de login
 * @param {*} user 
 * @param {*} password 
 * @returns boolean
 */

export const isValidPassword = (password, user) =>  bcrypt.compareSync(password, user.password)

// !Primero recibe la contraseña el string plano y luego la hasheada



export default __dirname


export const stringToBoolean = (string) => {
    if (string === "true") return true;
    if (string === "false") return false;
    return null;
  };

import MongoStore from 'connect-mongo';
export  const mongoStoreOptions = {
    store: MongoStore.create({
      mongoUrl: connectionString,
      crypto: {
        secret: "1234",
      },
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  };

