const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    default: '', // может быть пустым, если нет картинки
  },
}, {
  timestamps: true, // автоматически добавит createdAt и updatedAt
});

module.exports = mongoose.model('Event', eventSchema, 'events');
