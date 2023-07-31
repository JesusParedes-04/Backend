import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import morgan from 'morgan'
import './daos/mongodb/connection.js'
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";

import productRouter from './routes/product.routes.js'
import cartRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.router.js";
import MessageManager from "./daos/mongodb/messages.dao.js"
const messagesDao = new MessageManager();



import {Server} from "socket.io"
// const msgManager = new MessageManager(__dirname + '/db/message.json')



const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))
app.use(errorHandler)
app.use(morgan('dev'))



app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
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




