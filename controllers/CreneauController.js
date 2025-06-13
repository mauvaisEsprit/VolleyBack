// controllers/creneauController.js
const Creneau = require('../models/Creneau');

// Получить все creneaux
exports.getAllCreneaux = async (req, res) => {
  try {
    const creneaux = await Creneau.find().sort({ weekday: 1, startTime: 1 });
    res.json(creneaux);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении расписания' });
  }
};

// Создать новый creneau
exports.createCreneau = async (req, res) => {
  try {
    const { weekday, startTime, endTime, coachName, location } = req.body;
    const newCreneau = new Creneau({ weekday, startTime, endTime, coachName, location });
    await newCreneau.save();
    res.status(201).json(newCreneau);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при создании расписания', error: err.message });
  }
};

// Обновить creneau по id
exports.updateCreneau = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Creneau.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Не найдено расписание для обновления' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при обновлении расписания', error: err.message });
  }
};

// Удалить creneau по id
exports.deleteCreneau = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Creneau.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Не найдено расписание для удаления' });
    res.json({ message: 'Расписание удалено' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении расписания' });
  }
};
