class ProductManager {

  constructor() {
      this.products = [];
  }
  addProduct(title, description, price, thumbnail, code, stock) {

//Primera verificacion:

if(!title||!description||!price||!thumbnail||!code||!stock){
  console.log(`All fields are obligatory`);
  return;
      } 


if (this.codeDuplicated(code)) {
  console.log('ERROR - this code is already in use');
   return;
        }

      
          //Object Product
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


  }

  codeDuplicated(code) {
      if (this.products.find((product) => product.code === code)) {
        return true;
      }
      return false;
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


const variantproduct = new ProductManager()

variantproduct.addProduct('papas','negras',1200,'noimage','S1599',15)
variantproduct.addProduct('papas','blancas',1000,'noimage','S1533',12)
variantproduct.addProduct('cebolla','blancas',1000,'noimage','S1533',12)
variantproduct.addProduct('cebolla','morada',1000,'noimage','S113',12)
variantproduct.addProduct('tomate','redondo',1000,'noimage','S15113',12)

console.log(variantproduct.getProducts())
// variantproduct.getProductById(5)