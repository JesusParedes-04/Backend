import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils/utils.js";
import routes from "./routes/index.js";
import "./passport/jwt-strategy.js";
import socketManager from './sockets/chat.socket.js'
import logger from "./utils/logger.js";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(passport.initialize());

app.use("/", routes);

const httpServer = app.listen(PORT, () => {
  logger.debug(`Server OK ${PORT}`);
});

socketManager(httpServer)