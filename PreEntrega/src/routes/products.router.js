
import { Router } from "express";
const router = Router()
import ProductManager from "../managers/productManager.js";
const products = new ProductManager('./products.json');

router.get('/', async (req, res)=>{

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
    
    
router.get('/:id', async(req,res)=>{
    
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
    
    
router.post('/', async (req, res) => {
    
    try {
      
      const { title, description, price, thumbnail, code, stock } = req.body;
      const product = {
      
      title,
      description,
      price,
      thumbnail,
      code,
      stock
      
      };
      
      const newproduct = await products.addProduct(product);
      res.json(newproduct)
    
    } catch (error) {
      res.status(500).json({message:error.message})
    
    }
    
    });
    
    router.put('/:id', async(req, res) => {
      let id = parseInt(req.params.id);
      const updatedFields = req.body;
      
      await products.updateProduct(id, updatedFields);
      res.send('Product updated successfully');
    });
    
    router.delete('/:id', async(req, res) => {
      let id = parseInt(req.params.id);
      
      await products.deleteProduct(id);
      res.send('Product deleted successfully');
    });
    
    export default router;