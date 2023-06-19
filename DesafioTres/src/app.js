import express from "express";
import productManager from "./productManager.js";


const product = new productManager()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.post('/products', async (req, res)=> {
    let newProduct = req.body
    res.send(await product.writeProduct(newProduct))
})



app.listen(8080, ()=>{

    console.log('server express listening on port 8080 run')

})
