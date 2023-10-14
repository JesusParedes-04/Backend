import { Router } from "express";
import userRouter from './users.routes.js'
import productRouter from './product.routes.js'
import viewsRouter from './views.router.js'
import cartRouter from './carts.routes.js'


export default class IndexRouter {

    constructor() {

        this.router = Router()
        this.initRoutes();
    }

    initRoutes() {

        this.router.use('/users', userRouter)
        this.router.use('/products', productRouter)
        this.router.use('/api/carts', cartRouter);
        this.router.use('/chat', viewsRouter);
        this.router.use('/', viewsRouter);
    }

    //Metodo que Retorna this.router y lo llama desde el server.
    getRouter() {
        return this.router
    }
}