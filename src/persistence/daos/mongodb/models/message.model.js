import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  
  {

  id: {
    type: Number,
   
  },
  username: {
    type: String,
   
  },

  message: {
    type: String,
    
  },

},

{ collection: 'message' }

);

export const MessageModel = mongoose.model('message', messageSchema);

