const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
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
  date: {
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

module.exports = mongoose.model('News', newsSchema, 'news');
