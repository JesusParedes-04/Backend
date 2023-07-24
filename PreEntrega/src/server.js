import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import {Server} from "socket.io"
import ProductManager from "./managers/productManager.js"; 
// import { errorHandler } from "./middlewares/errorHandler.js";
// import morgan from 'morgan'

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(errorHandler)

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

//handlebars
app.engine('handlebars', handlebars.engine());
app.set ('views', __dirname + '/views');
app.set('view engine', 'handlebars');


const httpServer = app.listen(8080, ()=>{
  console.log('Server express listening on port 8080');
});



//l socket.io 
const socketServer = new Server(httpServer)
const products = new ProductManager('./products.json');

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
});

