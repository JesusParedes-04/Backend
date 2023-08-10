import mongoose from 'mongoose'



const cartsSchema = new mongoose.Schema({
  items: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    required: true,
  },
});

// const prodSchema = new mongoose.Schema({

//     prodId: 

//     { type: mongoose.ObjectId, ref: 'products' },
//     quantity:

//      { type: Number, required: true },
// })

// const cartsSchema = new mongoose.Schema({

//     products: { type: [prodSchema], required: true },

// })

export const CartsModel = mongoose.model('carts', cartsSchema)

