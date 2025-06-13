const mongoose = require('mongoose');

const partenaireSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  site: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default: '', // может быть пустым, если нет картинки
  },
}, {
  timestamps: true, // автоматически добавит createdAt и updatedAt
});

module.exports = mongoose.model('Partenaire', partenaireSchema, 'partenaires');
