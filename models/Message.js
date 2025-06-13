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
  replied: { type: Boolean, default: false },
}, {
  timestamps: true, // автоматически добавит createdAt и updatedAt
});

module.exports = mongoose.model('Message', messageSchema, 'messages');
