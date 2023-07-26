import mongoose from 'mongoose';


const connectionString = 'mongodb://localhost:27017/products'

try{
    await mongoose.connect(connectionString);
    console.log('conectado a la base de datos MongoDB')
} catch (error){
    console.log('Error al conectar a la base de datos:', error)
}