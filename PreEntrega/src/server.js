import express, {json, urlencoded} from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import handlebars from "express-handlebars";
import session from 'express-session'
import { __dirname } from "./utils.js";
import dotenv from 'dotenv'
import { errorHandler } from "./middlewares/errorHandler.js";
import morgan from 'morgan'
import IndexRouter from './routes/index.routes.js';

dotenv.config()

import userRouter from "./routes/users.routes.js"
import viewsRouter from "./routes/views.router.js";
import productRouter from './routes/product.routes.js'
import cartRouter from "./routes/carts.routes.js";

import "./daos/mongodb/connection.js";
import socketManager from './sockets/chat.socket.js'

const app = express();


const indexRouter = new IndexRouter()


app
//middlewares
.use(json())
.use(urlencoded({extended:true}))
.use(morgan('dev'))
//session
.use(cookieParser())
//passport
.use(passport.initialize())
.use(passport.session())

.use('/api',indexRouter.getRouter())

const PORT =process.env.PORT || 3000
    app.listen(PORT,()=>console.log(`server ok,port ${PORT}`))


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/public'));
// app.use(cookieParser())
// app.use(errorHandler)
// app.use(morgan('dev'))



// //passport
// app.use(passport.initialize())
// app.use(passport.session())

// app.use('/api/products', productRouter);
// app.use('/api/carts', cartRouter);
// app.use("/users", userRouter);
// app.use('/chat', viewsRouter);
// app.use('/', viewsRouter);

// // handlebars
// app.engine('handlebars', handlebars.engine());
// app.set('views', __dirname + '/views');
// app.set('view engine', 'handlebars');



// const httpServer = app.listen(8080, () => {
//   console.log('Server express listening on port 8080');
// });

// socketManager(httpServer)