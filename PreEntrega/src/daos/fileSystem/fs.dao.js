import fs from "fs";

export default class ProductDaoFs {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(obj) {
    try {
      const product = {
        id: await this.#getMaxId() + 1,
        ...obj
      }

      const productFile = await this.getProducts();
      productFile.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productFile))
  }catch(error){
console.log(error);
  } }

  codeDuplicated(code, productFile) {
    return productFile.some(product => product.code === code);
  }

  async #getMaxId() {
    try {
      const productFile = await this.getProducts();
      let maxId = 0;
      productFile.forEach(product => {
        if (product.id > maxId) maxId = product.id;
      });
      return maxId;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

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

  async getProductById(id) {

    try {

      const productFile = await this.getProducts()
      const product = productFile.find(prod => prod.id === id);
      if (product) return product
      else return false;
    } catch (error) {
      console.log(error)
    }

  }

  async deleteProduct(id) {
    try {
      const productFile = await this.getProducts();
      const productIndex = productFile.findIndex(product => product.id === id);

      if (productIndex === -1) {
        console.log('Product not founded');
        return;
      }

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

// const variantproduct = new ProductManager('./products.json');


