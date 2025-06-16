const Partenaire = require("../models/Partenaires");

/* GET /api/partners */
exports.getAll = async (req, res) => {
  try {
    const partners = await Partenaire.find().sort({ createdAt: -1 });
    res.json(partners);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* POST /api/partners */
exports.create = async (req, res) => {
  try {
    const partner = await Partenaire.create(req.body);
    res.status(201).json(partner);
  } catch (err) {
    if (err.code === 11000) {
      // dupliqué name
      return res.status(400).json({ message: "Nom déjà utilisé" });
    }
    res.status(400).json({ message: "Données invalides" });
  }
};

/* PUT /api/partners/:id (optionnel) */
exports.update = async (req, res) => {
  try {
    const partner = await Partenaire.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!partner) return res.status(404).json({ message: "Introuvable" });
    res.json(partner);
  } catch (err) {
    res.status(400).json({ message: "Données invalides" });
  }
};

/* DELETE /api/partners/:id */
exports.remove = async (req, res) => {
  try {
    const partner = await Partenaire.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ message: "Introuvable" });
    res.json({ message: "Supprimé", id: partner._id });
  } catch (err) {
    res.status(400).json({ message: "Id invalide" });
  }
};
