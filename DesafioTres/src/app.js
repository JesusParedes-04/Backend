import express from "express";
import ProductManager from "./productManager.js";

const app = express();
app.use(express.urlencoded({extended:true}));

const products = new ProductManager()
const readProducts = products.getProducts();

app.get('./products', async (req, res)=>{

    res.send(await readProducts);

})


app.listen(8080, ()=>{

    console.log('server express listening on port 8080 run')

})
