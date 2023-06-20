
import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Todos los campos son obligatorios');
        return;
      }

      const productFile = await this.getProducts();

      if (this.codeDuplicated(code, productFile)) {
        console.log('ERROR - this code is already in use');
        return;
      }

      const product = {
        id: this.#getMaxId(productFile) + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };

      productFile.push(product);
//---------------------------------Escribe contenido del archivo y lo pasa a String -------------------------------------
      
    await fs.promises.writeFile(this.path, JSON.stringify(productFile));

//---------------------------------Escribe contenido del archivo y lo pasa a String -------------------------------------

    } 
    
    catch (error) {
      console.log(error);
    }
  }

  codeDuplicated(code, productFile) {
    return productFile.some(product => product.code === code);
  }

  #getMaxId(productFile) {
    let maxId = 0;
    productFile.forEach(product => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }


// ---------------------------------------------Trae y Lee el contenido del archivo--------------------------
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        const productsjs = JSON.parse(products);
        return productsjs;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // ---------------------------------------------Trae y Lee el contenido del archivo--------------------------


  getProductById(id) {
    const product = this.products.find(producto => producto.id === id);
    if (!product) {
      console.log('Not Found');
    } else {
      console.log('Exist');
    }
  }

  async deleteProduct(id) {
    try {
      const productFile = await this.getProducts();
      const productIndex = productFile.findIndex(product => product.id === id);

      if (productIndex === -1) {
        console.log('Product not found');
        return;
      }
    // ------- cantidad de elementos a eliminar del productIndex -------
      productFile.splice(productIndex, 1);

      await fs.promises.writeFile(this.path, JSON.stringify(productFile));
      console.log('Product deleted successfully');
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const productFile = await this.getProducts();
      const productIndex = productFile.findIndex(product => product.id === id);

      if (productIndex === -1) {
        console.log('Product not found');
        return;
      }

    // obtener el objeto que representa eñ producto en la posición productIndex y actualizarlo

      const updatedProduct = {
        ...productFile[productIndex],
        ...updatedFields

      };

      productFile[productIndex] = updatedProduct;

      await fs.promises.writeFile(this.path, JSON.stringify(productFile));
      console.log('Product updated successfully');
    } catch (error) {
      console.log(error);
    }
  }

}

const variantproduct = new ProductManager('./products.json');

// const test = async () => {
//   await variantproduct.addProduct('papas', 'blancas',1800, 'C2131', 'Bk222', 1);
//   await variantproduct.addProduct('papas', 'rojas', 1600, 'A222', 'tew222', 24);
//   await variantproduct.addProduct('papas', 'negras', 1600, 'B222', 'Rtw222', 14);
//   await variantproduct.updateProduct(6,{
//     title:'papas', 
//     description:'moradas',
//     price: 1600,
//     thumbnail: 'B222',
//     code: 'Rtw99',
//     stock: 14}
    
//    );
// //   variantproduct.deleteProduct(2);
// }

// test()

// export default productManager

