const mongoose = require('mongoose');

const creneauSchema = new mongoose.Schema({
  weekday: {
    type: String,
    required: true,
    enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  },
  startTime: {
    type: String, // например "18:00"
    required: true,
  },
  endTime: {
    type: String, // например "20:00"
    required: true,
  },
  coachName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Creneau', creneauSchema, 'creneaux');
