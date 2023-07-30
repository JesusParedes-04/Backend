import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

});

export const MessageModel = mongoose.model('message', messageSchema);

