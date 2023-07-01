import { Router } from "express";
import cartsManager from "../managers/productManager.js";

const router = Router()

const cart = []

router.get("/", (req, res)=>{
    res.json(cart)
})

router.post("/",(req,res)=>{
const cart = req.body;
cart.push(cart)
res.json(cart)})



export default router