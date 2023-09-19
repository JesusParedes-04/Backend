import { createResponse } from "../utils.js";


export default class Controllers{
    constructor(service){
        this.service=service
    }
    async getAll (req,res){
       try {
        const item=await this.service.getAll()
        createResponse(res,200,item)
       } catch (error) {
        console.log(error);
       } 
    }
    async getById (req,res){
        try {
         const {id}=req.params
         const item=await this.service.getById(id)
         if(!item)createResponse(res,404,{method:"service",error:"service not found"})
        else createResponse(res,200,item)
        } catch (error) {
         console.log(error);
        } 
     }

     async create (req,res){
        try {
         const newItem=await this.service.create(req.body);
         if(!newItem)createResponse(res,404,{method:"service",error:"validation error"})
         else createResponse(res,200,newItem)
        } catch (error) {
         console.log(error);
        } 
     }
     async update (req,res){
        try {
         const {id}=req.params
         const item=await this.service.getById(id)
         if(!item)createResponse(res,404,{method:"service",error:"user not found"})
        else{ const itemUp=await this.service.update(id,req.body)
         createResponse(res,200,itemUp)
        }
        } catch (error) {
         console.log(error);
        } 
     }
     async delete(req,res){
        try {
            const {id}=req.params
            console.log("id desde controller",id)
            const item=await this.service.getById(id)
            if(!item)createResponse(res,404,{method:"service",error:"user not found"})
            else{ 
            await this.service.delete(id)
            
            createResponse(res,200,item) 
            }
        } catch (error) {
         console.log(error);
        } 
     }
}