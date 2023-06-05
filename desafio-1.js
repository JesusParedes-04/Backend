class ProductManager {

    constructor() {
        this.products = []
    }
    addProduct(title, description, price, thumbnail, code, stock) {

if(!title||!description||!price||!thumbnail||!code||!stock){
    console.log('All fields are obligatory');
} else {

const  verified = this.verified(code)
}

code

        //Objeto Producto
        const product = {

            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock

        };

        //Objeto agregado a lista
        this.products.push(product)

        //code

        this.products.forEach((cod) => {

         

        })

    }

    //Metodo ID autoincrementable
    #getMaxId() {
        let maxId = 0
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id
        })
        return maxId
    }


    getProducts() {
        return this.products
    }

    getProductById(id) {

       if(!this.products.find((producto)=> producto.id === id)){

console.log('Not Found')

       } else {
        console.log('Exist')
       }
        
    }

}


const variant = new ProductManager()

variant.addProduct('papas', 'negras', 1400, 'img', 12, 21)
variant.addProduct('papas', 'rojas', 1400, 'img', 12, 21)
variant.addProduct('papas', 'rojas', 1400, 'img', 12, 21)



console.log(variant.getProducts())
variant.getProductById(5)