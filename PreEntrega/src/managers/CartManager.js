import fs from "fs";

class CartManager {
    constructor(path){
        this.path = path
    }
}


const variantCart = new CartManager('./carts.json');
