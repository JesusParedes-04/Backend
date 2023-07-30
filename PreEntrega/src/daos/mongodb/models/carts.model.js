import mongoose from 'mongoose'


const prodSchema = new mongoose.Schema({
    prodId: { type: mongoose.ObjectId, ref: 'products' },
    quantity: { type: Number, required: true },
})

const cartsSchema = new mongoose.Schema({
    products: { type: [prodSchema], required: true },

})

export const CartsModel = mongoose.model('carts', cartsSchema)

