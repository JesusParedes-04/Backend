import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import morgan from 'morgan'
import { __dirname, createHash, mongoStoreOptions } from "./utils.js";
import handlebars from "express-handlebars";
import session from "express-session";
import productRouter from './routes/product.routes.js'
import cartRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.router.js";
import userRouter from "./routes/users.routes.js"
import sessionUser from "./middlewares/sessionUser.js";
import "./daos/mongodb/connection.js";
import passport from "passport";
import './passport/local-strategy.js'
import './passport/github-strategy.js'
import socketManager from './sockets/chat.socket.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))
app.use(errorHandler)
app.use(session(mongoStoreOptions));
app.use(sessionUser)
app.use(morgan('dev'))

//Passport va Antes de Rutas
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use("/users", userRouter);
app.use('/chat', viewsRouter);
app.use('/', viewsRouter);

// handlebars
app.engine('handlebars', handlebars.engine());
app.set ('views', __dirname + '/views');
app.set('view engine', 'handlebars');

createHash

const httpServer = app.listen(8080, ()=>{
  console.log('Server express listening on port 8080');
});

socketManager(httpServer)