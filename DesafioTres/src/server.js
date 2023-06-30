import express from "express";
import productRouter from '/PreEntrega/src/routes/products.router'
const app = express();

//Middlewares: Reconoce tanto la info que llega desde el body (desde el lado del cliente)
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use ('/products')



//------------------------ - -----------------------------


app.listen(8080, ()=>{
  console.log('Server express listening on port 8080');
});
