const TarifPack = require("../models/TarifPack");

// Получить все тарифы
exports.getAll = async (req, res) => {
  try {
    const packs = await TarifPack.find();
    res.json(packs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить один тариф по ID
exports.getById = async (req, res) => {
  try {
    const pack = await TarifPack.findById(req.params.id);
    if (!pack) return res.status(404).json({ error: "Tarif non trouvé" });
    res.json(pack);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Создать тариф
exports.create = async (req, res) => {
  try {
    const newPack = new TarifPack(req.body);
    const savedPack = await newPack.save();
    res.status(201).json(savedPack);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Обновить тариф
exports.update = async (req, res) => {
  try {
    const updatedPack = await TarifPack.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPack) return res.status(404).json({ error: "Tarif non trouvé" });
    res.json(updatedPack);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Удалить тариф
exports.delete = async (req, res) => {
  try {
    const deletedPack = await TarifPack.findByIdAndDelete(req.params.id);
    if (!deletedPack) return res.status(404).json({ error: "Tarif non trouvé" });
    res.json({ message: "Tarif supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
