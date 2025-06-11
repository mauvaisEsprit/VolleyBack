const Event = require('../models/Event');
const slugify = require('slugify');

// Получить все события
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ dateStart: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des événements.' });
  }
};

// Получить одно событие по slug
exports.getEventBySlug = async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ error: 'Événement non trouvé.' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'événement.' });
  }
};

// Создать новое событие
exports.createEvent = async (req, res) => {
  try {
    // Генерируем slug автоматически из title
    req.body.slug = slugify(req.body.title, {
         lower: true,
         strict: true,   // Убирает все символы кроме букв, цифр и дефисов
         remove: /[*+~.()'"!:@]/g  // Дополнительное удаление спецсимволов по необходимости
   });

    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création de l\'événement.', details: err.message });
  }
};

// Обновить событие по slug
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Événement non trouvé pour mise à jour.' });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour de l\'événement.', details: err.message });
  }
};

// Удалить событие по slug
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({ slug: req.params.slug });

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Événement non trouvé pour suppression.' });
    }

    res.status(200).json({ message: 'Événement supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'événement.' });
  }
};
