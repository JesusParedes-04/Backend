import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js"

const app = express();

//Middlewares: Reconoce tanto la info que llega desde el body (desde el lado del cliente)

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use('/products', productRouter)
app.use('/cart', cartRouter)


app.listen(8080, ()=>{
  console.log('Server express listening on port 8080');
});
