import express from "express";
import ProductManager from "./productManager.js";

const app = express();

//Middlewares: Reconoce tanto la info que llega desde el body (desde el lado del cliente)
app.use(express.json())
app.use(express.urlencoded({extended:true}));

const products = new ProductManager('./products.json');


//------------------------ - -----------------------------

app.get('/products', async (req, res)=>{

try {

  let limit = parseInt(req.query.limit); 
  if (!limit) return res.send(await products.getProducts());
  
  let productsAll = await products.getProducts();
  let productsLimit = productsAll.slice(0, limit);
  res.status(200).json(productsLimit)

}

catch (error){
  res.status(404).json ({message:error.message});
}

});


app.get('/products/:id', async(req,res)=>{

try {


  let id = parseInt(req.params.id);
  let productsAll = await products.getProducts();
  let productByID = productsAll.find(prod => prod.id === id );
  
  if (productByID) {
    res.json(productByID);
  } else {
    res.status(400).json({message:'User not found'});
  }
}
  
  catch (error) {
    res.status(400).json({message:error.message})
  }
  
});


//------------------------ - -----------------------------



//Servidor Cerrado para usarlo en la PreEntrega

// app.listen(8080, ()=>{
//   console.log('Server express listening on port 8080');
// });