import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import {  __dirname  } from "./utils.js";
import routes from "./routes/index.js";
import "./passport/jwt-strategy.js";
import socketManager from './sockets/chat.socket.js'
import logger from "./utils/logger.js";
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc";
import { info } from "./docs/info.js";
import { PORT } from "./config.js";
import session from "express-session";

const app = express();

const specs = swaggerJSDoc(info)

app.use ('/docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname  + "/views");


app.use(passport.initialize());

app.use("/", routes);
const httpServer = app.listen(PORT, () => {
  logger.debug(`Server OK ${PORT}`);
});

socketManager(httpServer)

