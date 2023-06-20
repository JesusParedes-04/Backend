import express from "express";
import ProductManager from "./productManager.js";

const app = express();
app.use(express.urlencoded({extended:true}));

const products = new ProductManager('./products.json');

app.get('/products', async (req, res)=>{
  let limit = parseInt(req.query.limit);
  if (!limit) return res.send(await products.getProducts());
  
  let productsAll = await products.getProducts();
  let productsLimit = productsAll.slice(0, limit);
  res.send(productsLimit);
});

app.get('/products/:id', async(req,res)=>{
  let id = parseInt(req.params.id);
  let productsAll = await products.getProducts();
  let productByID = productsAll.find(prod => prod.id === id );
  
  if (!productByID) {
    res.send('Product not found');
  } else {
    res.send(productByID);
  }
});

app.listen(8080, ()=>{
  console.log('Server express listening on port 8080');
});