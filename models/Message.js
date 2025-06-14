const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  replyText: {
    type: String,
  },
  replyDate: {
    type: Date, // <- лучше дата, а не строка
  },
  replied: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // добавляет createdAt и updatedAt
});

module.exports = mongoose.model('Message', messageSchema, 'messages');
