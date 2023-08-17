import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import morgan from 'morgan'
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import productRouter from './routes/product.routes.js'
import cartRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.router.js";
import userRouter from "./routes/users.routes.js"
import sessionUser from "./middlewares/sessionUser.js";
import "./daos/mongodb/connection.js";
import MessageManager from "./daos/mongodb/messages.dao.js"
import {connectionString} from "./daos/mongodb/connection.js"
const messagesDao = new MessageManager();

const mongoStoreOptions = {
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

import {Server} from "socket.io"
const msgManager = new MessageManager(__dirname + '/db/message.json')

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))
app.use(errorHandler)
app.use(session(mongoStoreOptions));
app.use(sessionUser)

app.use(morgan('dev'))

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use("/users", userRouter);
app.use('/chat', viewsRouter);
app.use('/', viewsRouter);

// handlebars
app.engine('handlebars', handlebars.engine());
app.set ('views', __dirname + '/views');
app.set('view engine', 'handlebars');


const httpServer = app.listen(8080, ()=>{
  console.log('Server express listening on port 8080');
});



// socket.io 
const socketServer = new Server(httpServer)
// const products = new ProductManager('./products.json');

socketServer.on('connection', (socket) => {
  console.log('New Connection!', socket.id);

  socket.on('guardarProducto', async (productoData) => {
    try {
      await products.addProduct(productoData);

      socketServer.emit('productoAgregado', productoData);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected!', socket.id);
  });

  socket.on('newUser', (user)=>{
    console.log(`>${user} inició sesión`);
})

socket.on('chat:message', async(msg) =>{
  await messagesDao.create(msg);
  socketServer.emit('message', await messagesDao.getAll());
})

socket.emit('msg', 'bienvenido al chat');

socket.on('newUser', (user)=>{
  socket.broadcast.emit('newUser', user);
})

socket.on('chat:typing', (user)=>{
  socket.broadcast.emit('chat:typing', user)
})

})




